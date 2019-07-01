<template>
  <div class="cart">
    <div class="not" v-if="!logined">
      <text class="iconfont icon-buy-car"></text>
      <div class="text">未登录~</div>
      <div class="btn" @click="toMy">去登录</div>
    </div>

    <div class="login" v-if="logined">
      <div class="list">
        <!-- 头部 -->
        <div class="head">
          <!-- 总价 -->
          <div class="total" :class="{ hide: selectMode === 1 }">合计：￥{{allPrice}}</div>

          <!-- 管理 下单选择 切换 -->
          <div class="mode" @click="modeSwitch">
            {{selectMode === 0 ? '编辑' : ''}}
            {{selectMode === 1 ? '完成' : ''}}
          </div>
        </div>

        <!-- 列表 -->
        <Liq
          @selectChange="selectChange"
          :item="item"
          :selects="selects"
          v-for="item in carts"
          :key="item.specId"></Liq>

        <!-- 底部操作 -->
        <div class="handle">
          <!-- 全选 -->
          <div class="checkbox" @click="allHandle">
            <checkboxq :checked="all"/>
            <text class="text">全选</text>
          </div>

          <!-- 按钮 -->
          <div
            class="btn"
            :class="{
              red: selects.length,
            }"
            @click="btn">
            {{selectMode === 0 ? '去结算' : ''}}
            {{selectMode === 1 ? '删除' : ''}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Liq from './li'
import checkboxq from './checkbox'

export default {
  components: { Liq, checkboxq },
  data () {
    return {
      // ====== 多选数组 存放的是规格 ID 进行区别
      // 下单多选
      selectPay: [],
      // 管理多选
      selectManage: [],
      // 选中模式 0 下单 1 管理
      selectMode: 0
    }
  },
  computed: {
    ...mapState(['logined', 'carts']),
    // 多选
    selects () {
      if (this.selectMode === 0) return this.selectPay
      if (this.selectMode === 1) return this.selectManage
    },
    // 是否全选
    all () {
      if (this.selects.length === this.carts.length) return true
      return false
    },
    // 总价
    allPrice () {
      let n = 0
      this.selectPay.forEach(specId => {
        const shop = this.carts.find(v => v.specId === specId)
        n += shop.info.spec.find(item => item.id === specId).price * shop.n
      })
      return n
    }
  },
  methods: {
    ...mapActions(['rmCarts']),
    ...mapMutations(['setCartsPay']),
    toMy () {
      wx.switchTab({ url: '/pages/my/main' })
    },
    // 全选 取消全选
    allHandle (v) {
      // 是否已经全选
      const isAll = this.carts.length === this.selects.length

      let selects
      // 进行全选
      if (!isAll) selects = this.carts.map(item => item.specId)
      // 取消全选
      if (isAll) selects = []

      if (this.selectMode === 0) this.selectPay = selects
      if (this.selectMode === 1) this.selectManage = selects
    },
    // 某一项取消选择 / 选择
    selectChange (specId) {
      if (this.selectMode === 0) {
        const index = this.selectPay.findIndex(item => item === specId)
        if (index !== -1) this.selectPay.splice(index, 1)
        if (index === -1) this.selectPay.push(specId)
      }

      if (this.selectMode === 1) {
        const index = this.selectManage.findIndex(item => item === specId)
        if (index !== -1) this.selectManage.splice(index, 1)
        if (index === -1) this.selectManage.push(specId)
      }
    },
    // 选择模式切换
    modeSwitch () {
      this.selectMode = this.selectMode === 0 ? 1 : 0
    },
    // 删除 / 结算
    btn () {
      // 去往结算页面
      if (this.selectMode === 0) {
        if (this.selectPay.length === 0) return
        // 下单商品临时存放
        let arr = this.selectPay.map(specId => {
          return this.carts.find(v => v.specId === specId)
        })
        this.setCartsPay(arr)
        // 并清空下单数组 和 购物车中相应的项。在付款页付款后，清除相应的购物车项
        this.selectManage = []
        this.selectPay = []
        wx.navigateTo({ url: '/pages/carts_pay/main' })
      }
      if (this.selectMode === 1) {
        // 删除
        this.selectManage.forEach(item => this.rmCarts(item))
        this.selectManage = []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// 顶部栏高度
$head-height = 80rpx
// 底部栏高度
$handle-height = 100rpx

// 隐藏
.hide
  opacity 0
  transition opacity .3s
// 显示
.show
  opacity 1
  transition opacity .3s

.cart
  .not
    text-align center
    margin-top 200rpx
    .iconfont
      font-size 100rpx
      color #999
    .text
      color #999
      margin-top 20rpx
    .btn
      background-color $red - 10%
      color #fff
      width 200rpx
      padding 20rpx
      margin 20rpx auto 0
      border-radius 10rpx
  .list
    padding-top $head-height
    padding-bottom $handle-height
    > .head
      display flex
      justify-content space-between
      position fixed
      top 0
      width 100%
      height $head-height
      line-height $head-height
      padding 0 20rpx
      box-sizing border-box
      z-index 1000
      .total
        color $red
        transition opacity .3s
      .mode
        color #666
    .handle
      display flex
      justify-content space-between
      position fixed
      bottom 0
      width 100%
      height $handle-height
      z-index 1000
      .checkbox
        background-color #fff
        width 70%
        display flex
        align-items center
        padding-left 20rpx
        box-sizing border-box
        border-bottom 1rpx solid #eee
        .text
          margin-left 20rpx
      .btn
        color #fff
        width 30%
        display flex
        justify-content center
        align-items center
        font-size 35rpx
        background-color #ccc
        transition background-color .3s
        &.red
          background-color $red
</style>
