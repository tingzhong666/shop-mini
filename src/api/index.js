import http from './http'

// 轮播图
export const banner = function () {
  return http.get('/banner')
}

// 商品分类
export const tabs = function (query = {}) {
  return http.get('/tabs', query)
}

// 二级分类
export const twoTabs = function (query = {}) {
  return http.get('/twotabs', query)
}

// 拼团商品列表
export const group = function (query = {}) {
  return http.get('/group', query)
}

// 秒杀商品列表
export const seckill = function (query = {}) {
  return http.get('/seckill', query)
}

// 普通商品列表 推荐商品列表
export const shop = function (query = {}) {
  return http.get('/shop', query)
}

// 搜索热词
export const hotKey = function () {
  return http.get('/hotkey')
}

// 搜索商品列表 接口差不多直接共用
export const searchList = function (query = {}) {
  return http.get('/shop', query)
}

// 某分类商品列表 接口差不多直接共用
export const tabList = function (query = {}) {
  return http.get('/shop', query)
}

// 商品详情
export const details = function (query = {}) {
  return http.get('/details', query)
}

// 商品评价
export const comments = function (query = {}) {
  return http.get('/comments', query)
}

// 登录
export const login = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async res => {
        resolve(await http.get('/login', { code: res.code }))
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 地址列表
export const addressList = function () {
  return http.get('/addresslist')
}

// 地址详情
export const address = function (query = {}) {
  return http.get('/address', query)
}

// 订单列表
export const orderList = function (query = {}) {
  return http.get('/orderlist', query)
}

// 订单详情
export const order = function (query = {}) {
  return http.get('/order', query)
}

// 评价列表
export const evaluate = function () {
  return http.get('/evaluate')
}
