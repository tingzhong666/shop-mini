<template>
  <div class="list">
    <!-- ========== 首页页面秒杀/拼团/推荐板块列表 拼团页面头部列表 ========== -->
    <div
      class="li"
      v-for="(item, index) in list"
      :key="index"
      :class="{ shopLi: mode === 'shop' }"
      :style="{ width: mode === 'shop' ? '340rpx' : '210rpx' }"
      @click="click(item.id)">
      <!-- 秒杀降价 -->
      <div class="drop" v-if="mode === 'seckill'">降<text class="i">￥{{item.origin - item.price}}</text></div>
      <!-- 商品图片 -->
      <div class="img">
        <image :src="item.img" mode="aspectFit" class="img"/>
      </div>
      <!-- 标题 -->
      <div class="title">{{item.title}}</div>
      <!-- 秒杀原价 -->
      <div class="origin" v-if="mode === 'seckill'">￥{{item.origin}}</div>
      <!-- 价格 / 秒杀价 -->
      <div class="price i">￥{{item.price}}</div>
      <!-- 拼团 人数 -->
      <div class="group-n" v-if="mode === 'group'">{{item.n}}人团</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: 'seckill'
      // seckill group shop
    }
  },
  methods: {
    // 点击商品
    click (id) {
      wx.navigateTo({ url: '/pages/details/main?type=' + this.mode + '&id=' + id })
    }
  }
}
</script>

<style lang="stylus" scoped>
// 斜体
.i
  font-style oblique
.list
  width 100%
  display flex
  justify-content space-around
  flex-wrap wrap
  .li
    background-color #fff
    padding 0 20rpx 20rpx
    box-sizing border-box
    // 秒杀降了多少钱
    .drop
      font-size 25rpx
      background -webkit-linear-gradient(left, blue, $red)
      width 130rpx
      margin 0 auto
      text-align center
      color #fff
      font-weight 900
    .img
      .img
        width 100%
        height 200rpx
    .title
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      font-size 30rpx
    // 秒杀原价
    .origin
      font-size 25rpx
      color #999
      text-decoration-line line-through
      text-align center
    // 秒杀价 拼团价 普通价
    .price
      color $red - 20%
      font-weight 900
      font-size 30rpx
      text-align center
    // 几人团
    .group-n
      color $red
      border 1rpx solid $red
      font-size 25rpx
      text-align center
      width 100rpx
      margin 0 auto
      margin-top 10rpx
  // 普通商品每项
  .shopLi
    margin-bottom 20rpx
    .price
      color #fff
      background -webkit-linear-gradient(left, blue, $red)
      width 150rpx
      margin 10rpx auto 0
</style>
