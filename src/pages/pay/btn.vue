<template>
  <div class="btn">
    <div class="left">
      实际支付：
      <text class="price">{{price}}</text>
    </div>
    <div class="right" @click="pay">微信支付</div>
  </div>
</template>

<script>
export default {
  props: {
    remarks: {
      default: ''
    },
    info: {
      default: {}
    },
    specIndex: {
      default: 0
    }
  },
  computed: {
    price () {
      return Object.keys(this.info).length ? '￥' + this.info.spec[this.specIndex].price : ''
    }
  },
  methods: {
    pay () {
      // 根据是否付款，进行生成不同类型订单
      wx.showToast({ title: '没有接口', icon: 'none' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn
  position fixed
  bottom 0
  left 0
  width 100%
  > div
    display inline-block
    height 100rpx
    line-height 100rpx
  .left
    width 70%
    background-color #fff
    padding-left 30rpx
    box-sizing border-box
    .price
      color $red - 10%
  .right
    width 30%
    background-color $red
    color #fff
    text-align center
</style>
