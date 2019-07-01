import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'
import { rmStorage } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 商品全部一级分类
    tabs: [],
    // 选中的一级分类
    active: '手机',
    logined: false,
    userInfo: {},
    // 默认地址
    address: {},
    // 购物车
    carts: [],
    // 购物车商品下单选中列表 临时存放数组
    cartsPay: []
  },
  mutations: {
    setTabs (state, newV) {
      state.tabs = newV
    },
    setActive (state, newV) {
      state.active = newV
    },
    setLogined (state, newV) {
      state.logined = newV
    },
    setUserInfo (state, newV) {
      state.userInfo = newV
    },
    setAddress (state, newV) {
      state.address = newV
    },
    // 购物车
    setCarts (state, newV) {
      state.carts = newV
    },
    pushCarts (state, shop) {
      const isHas = state.carts.find(item => item.specId === shop.specId)
      if (isHas) {
        wx.showToast({ title: '购物车中已存在', icon: 'none' })
        return
      }
      state.carts.push(shop)
    },
    modifyN (state, { specId, n }) {
      const isHas = state.carts.find(item => item.specId === specId)
      if (!isHas) return
      if (n > 0 && n <= isHas.info.surplus) isHas.n = n
    },
    removeCarts (state, specId) {
      const index = state.carts.findIndex(item => item.specId === specId)
      if (index !== -1) {
        state.carts.splice(index, 1)
      }
    },
    clearCarts (state) {
      state.carts = []
    },
    setCartsPay (state, newV) {
      state.cartsPay = newV
    }
  },
  actions: {
    // 获取一级目录
    async getTabs ({ commit }) {
      let res = await api.tabs()
      if (!res.code) {
        commit('setTabs', res.data)
      }
    },
    // 获取默认地址
    async getDefAddress ({ commit }) {
      const res = await api.addressList()
      if (res.code === 0) {
        const def = res.data.find(item => item.default)
        commit('setAddress', def)
      }
    },
    init ({ state, dispatch }) {
      if (state.logined) {
        dispatch('getDefAddress')
      }

      dispatch('getTabs')
      dispatch('getCarts')
    },
    // 退出登录
    logout ({ commit }) {
      rmStorage('openid')
      commit('setLogined', false)
      commit('setUserInfo', {})
    },
    // 对购物车进行缓存
    cartsStorage ({ state }) {
      wx.setStorage({
        key: 'carts',
        data: state.carts
      })
    },
    // 获取购物车缓存
    getCarts ({ commit }) {
      wx.getStorage({
        key: 'carts',
        success: res => {
          commit('setCarts', res.data)
        },
        fail: err => {
          if (err.errMsg === 'getStorage:fail data not found') {
            wx.setStorage({
              key: 'carts',
              data: []
            })
            return
          }
          throw err
        }
      })
    },
    // 增
    addCarts ({ commit, dispatch }, shop) {
      commit('pushCarts', shop)
      dispatch('cartsStorage')
    },
    // 删
    rmCarts ({ commit, dispatch }, specId) {
      commit('removeCarts', specId)
      dispatch('cartsStorage')
    },
    // 改 商品数量加减
    modifyCarts ({ commit, dispatch }, { specId, n }) {
      commit('modifyN', { specId, n })
      dispatch('cartsStorage')
    },
    // 清空
    clearCartsS ({ commit, dispatch }) {
      commit('clearCarts')
      dispatch('cartsStorage')
    }
  }
})

export default store
