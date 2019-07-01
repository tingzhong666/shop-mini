<template>
  <div class="index">
    <!-- 地址 -->
    <div class="address" v-if="mode === 'cartsPay'">
      <Addressq/>
    </div>

    <!-- 商品状态 -->
    <div class="mode" v-if="mode === 'order'">
      状态：
      <text class="red">{{status}}</text>
    </div>

    <!-- 商品列表 -->
    <div class="list">
      <Liq v-for="item in list" :key="item" :item="item"/>
    </div>

    <!-- 算账 -->
    <div class="bill">
      <bill
        @input="input" v-bind="{
          payPrice,
          mode,
          allFreight,
          allPrice
        }"/>
    </div>

    <!-- 操作 -->
    <div class="bottom" v-if="mode === 'cartsPay'">
      <div class="left">
        实际支付：
        <text class="red">￥{{payPrice}}</text>
      </div>

      <div class="right" @click="pay">微信支付</div>
    </div>
  </div>
</template>

<script>
import Addressq from '@/components/address'
import Liq from './li'
import bill from './bill'

export default {
  components: { Addressq, Liq, bill },
  props: {
    // 商品列表
    list: {
      type: Array,
      default: () => []
    },
    // 商品总价
    allPrice: {
      type: Number,
      default: 0
    },
    // 运费总价
    allFreight: {
      type: Number,
      default: 0
    },
    // 合计
    payPrice: {
      type: Number,
      default: 0
    },
    // 模式 cartsPay 购物车提交订单 order 订单详情
    mode: {
      type: String,
      default: ''
    },
    // 订单状态
    status: {
      type: String,
      default: 'status'
    }
  },
  methods: {
    // 备注
    input (v) {
      this.$emit('input', v)
    },
    // 支付
    pay () {
      this.$emit('pay')
    }
  }
}
</script>

<style lang="stylus" scoped>
// 底部栏高度
$bottom-height = 100rpx

.index
  padding-bottom $bottom-height
  .mode
    margin-bottom 20rpx
    background-color #fff
    padding 30rpx 20rpx
    .red
      color $red
  .address
    margin-bottom 20rpx
  .list
    background-color #fff
    padding 20rpx
    margin-bottom 20rpx
  .bottom
    position fixed
    bottom 0
    width 100%
    height $bottom-height
    display flex
    z-index 1000
    > div
      display flex
      align-items center
    .left
      width 70%
      background-color #fff
      box-sizing border-box
      padding-left 20rpx
      .red
        color $red
    .right
      width 30%
      background-color $red
      justify-content center
      color #fff
</style>
