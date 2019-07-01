<template>
  <div class="evaluate">
    <div
      class="li"
      v-for="item in arr"
      :key="item">
      <!-- 评价内容 -->
      <div class="content">{{item.content}}</div>
      <!-- 配图 -->
      <div class="peitu">
        <image class="img" mode="widthFix" v-for="(v, i) in item.imgs" :key="i" :src="v"></image>
      </div>

      <!-- 商品信息 -->
      <div class="shop" @click="toShop(item)">
        <!-- 图片 -->
        <div class="img">
          <image class="img" :src="item.shop_img" mode="widthFix"></image>
        </div>
        <!-- 右边描述 -->
        <div class="right">
          <!-- 标题 -->
          <div class="title">
            <div class="title">{{item.title}}</div>
            <!-- 数量 -->
            <div class="n">x{{item.n}}</div>
          </div>
          <!-- 规格 -->
          <div class="spec">{{item.spec}}</div>
          <!-- 单价 -->
          <div class="price">￥{{item.price}}</div>
        </div>
      </div>

      <!-- 时间 -->
      <div class="time">{{item.created_time}}</div>
    </div>
  </div>
</template>

<script>
import { evaluate } from '@/api'
import { date } from '@/utils'

export default {
  data () {
    return {
      list: []
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
    async get () {
      const res = await evaluate()
      if (res.code === 0) {
        this.list = res.data
      }
    },
    // 去往商品详情页
    toShop (item) {
      wx.navigateTo({ url: '/pages/details/main?type=shop&id=' + item.id })
    }
  },
  onLoad () {
    this.get()
  },
  onUnload () {
    this.list = []
  }
}
</script>

<style lang="stylus" scoped>
.evaluate
  .li
    background-color #fff
    padding 20rpx
    margin-bottom 20rpx
    > div
    .right > div
      margin-bottom 20rpx
      &:last-child
        margin-bottom 0
    .peitu
      display flex
      .img
        width 220rpx
        margin-right 25rpx
        &:nth-child(3n)
          margin-right 0
    .shop
      background-color #eee
      display flex
      padding 20rpx
      > .img
        width 20%
        .img
          width 100%
      .right
        width 80%
        > .title
          width 100%
          display flex
          justify-content space-between
          .title
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            width 70%
          .n
            width 30%
            text-align right
        .spec
          font-size 25rpx
        .price
          color $red - 10%
    .time
      font-size 25rpx
      color #999
</style>
