<template>
  <div class="list">
    <div
      class="li"
      v-for="item in arr"
      :key="item">
      <!-- 订单号 -->
      <div class="order-n" @click="details(item)" hover-class="hover">
        <div class="n">{{item.id}}</div>

        <div class="text">
          {{label === '全部' ? '待付款' : label}}
          <text class="iconfont icon-zuojiankuohao"></text>
        </div>
      </div>

      <!-- 商品图片列表 -->
      <div class="imgs">
        <image
          class="img"
          mode="widthFix"
          v-for="(v, i) in item.shop"
          :key="i"
          :src="v"></image>
      </div>

      <!-- 合计 -->
      <div class="all">
        共{{item.shop.length}}件商品
        合计：
        <text class="red">￥{{item.price}}</text>
      </div>

      <!-- 时间 -->
      <div class="time">
        {{item.created_time}}
      </div>

      <!-- 操作 -->
      <div class="handle">
        <!-- 待付款操作 -->
        <block v-if="label === '全部' || label === '待付款'">
          <div class="btn pay" @click="click('马上付款')">马上付款</div>
          <div class="btn" @click="click('取消订单')">取消订单</div>
        </block>

        <!-- 待发货 -->
        <block v-if="label === '待发货'">
          <div class="btn" @click="click('点击催货')">点击催货</div>
        </block>

        <block v-if="label === '待收货'">
          <div class="btn" @click="click('查看物流')">查看物流</div>
          <div class="btn" @click="click('确认收货')">确认收货</div>
        </block>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from '@/utils'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    arr () {
      return this.list.map(item => {
        item.created_time = date(item.created_time)
        return item
      })
    }
  },
  methods: {
    // 按钮点击
    click (label) {
      wx.showToast({ title: '没有接口', icon: 'none' })
    },
    // 去往订单详情页
    details (item) {
      wx.navigateTo({ url: '/pages/order/main?id=' + item.id })
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  padding-top 20rpx
  .li
    margin-bottom 20rpx
    background-color #fff
    padding 1rpx 0
    > div
      margin-bottom 20rpx
      padding 0 20rpx
    .order-n
      display flex
      justify-content space-between
      height 80rpx
      line-height 80rpx
      border-bottom 1rpx solid #eee
      &.hover
        background-color #fff - 10%
    .imgs
      display flex
      .img
        width 20%
    .all
      text-align right
      border-bottom 1rpx solid #eee
      padding-bottom 20rpx
      .red
        color $red
    .handle
      display flex
      justify-content flex-end
      .btn
        line-height 60rpx
        height 60rpx
        width 150rpx
        text-align center
        border 1rpx solid #ccc
        margin-left 20rpx
        border-radius 10rpx
        &.pay
          color $red
          border-color $red
</style>
