<template>
  <div class="index">
    <!-- 弧形 -->
    <div class="arc"></div>

    <!-- 搜索 -->
    <div class="search">
      <Search/>
    </div>

    <!-- 分类 -->
    <div class="tabs">
      <Tabs :list="tabs"/>
    </div>

    <!-- 轮播图 -->
    <swiper
      indicator-dots
      interval="3000"
      circular
      autoplay
      class="banner">
      <swiper-item
        v-for="item in banner"
        :key="item.img"
        @click="click(item.id)"
        class="li">
        <img :src="item.img" class="img">
      </swiper-item>
    </swiper>

    <!-- 秒杀 -->
    <div class="seckill">
      <Seckill :info="seckill"/>
    </div>

    <!-- 拼团 -->
    <div class="group">
      <Group :list="group"/>
    </div>

    <!-- 推荐 -->
    <div class="shop">
      <Shop :list="shop"/>
      <!-- 没有更多 -->
      <div class="noHave">{{isHave ? '正在加载中' : '已经到底了！'}}</div>
    </div>
  </div>
</template>

<script>
import Tabs from './tabs'
import Search from './search'
import Seckill from './seckill'
import Group from './group'
import Shop from './shop'
import { banner, tabs, seckill, group, shop } from '@/api'

export default {
  data () {
    return {
      // 轮播图
      banner: [],
      // 分类
      tabs: [],
      // 秒杀
      seckill: {},
      // 拼团
      group: [],
      // 推荐
      shop: [],
      // 推荐页数
      shopPage: 1,
      // 推荐商品，是否还有
      isHave: true
    }
  },
  components: {
    Tabs,
    Search,
    Seckill,
    Group,
    Shop
  },
  methods: {
    async get () {
      let res = await Promise.all([
        banner(),
        tabs({ type: 'index' }),
        seckill({ limit: 3 }),
        group({ limit: 3 }),
        shop({ limit: 10, page: 1 })
      ])

      if (!res[0].code) {
        this.banner = res[0].data
      }
      if (!res[1].code) {
        this.tabs = res[1].data
      }
      if (!res[2].code) {
        this.seckill = res[2].data
      }
      if (!res[3].code) {
        this.group = res[3].data
      }
      if (!res[4].code) {
        this.shop = res[4].data
      }
    },
    // 轮播图点击
    click (id) {
      wx.navigateTo({ url: '/pages/details/main?type=shop&id=' + id })
    }
  },
  onLoad () {
    this.get()
  },
  // 触底加载更多推荐
  async onReachBottom () {
    let res = await shop({ limit: 10, page: ++this.shopPage })
    if (res.code === 0) {
      this.shop = this.shop.concat(res.data)
      if (res.data.length === 0) this.isHave = false
    }
  },
  // 转发
  onShareAppMessage () {
    return {
      title: '听众优购商城'
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  position relative
  // 弧形
  .arc
    background-color $red
    width 160%
    height 400rpx
    border-radius 0 0 50% 50%
    position absolute
    left -30%
    top 0
  // 搜索
  .search
    position relative
  // 分类
  .tabs
    top 50rpx
    position relative
  // 轮播图
  .banner
    margin-top 50rpx
    padding 20rpx
    .li
      .img
        // 不能定义高度，不然不同手机显示不一样
        width 100%
  .shop
    .noHave
      text-align center
      font-size 35rpx
      color #999
      margin-bottom 20rpx
</style>
