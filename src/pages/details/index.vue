<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="banner">
      <swiper
        indicator-dots
        interval="3000"
        circular
        class="swiper"
        autoplay>
        <swiper-item
          v-for="item in banner"
          :key="item"
          class="li">
          <image :src="item" class="img"/>
        </swiper-item>
      </swiper>
    </div>

    <!-- 价格 标题 -->
    <div class="head">
      <!-- 普通商品价格 -->
      <div class="shop-price" v-if="type === 'shop'">￥{{price}}</div>
      <!-- 秒杀商品价格 -->
      <div class="seckill-price" v-if="type === 'seckill'">
        <div class="left">
          <text class="text">秒杀</text>
          <text class="price">￥{{price}}</text>
          <text class="origin">￥{{origin}}</text>
        </div>

        <div class="right">距离结束 {{seckillTime}}</div>
      </div>
      <!-- 拼团商品价格 -->
      <div class="group-price" v-if="type === 'group'">
        <div class="left">
          <text class="text">拼团</text>
          <text class="price">￥{{price}}</text>
          <text class="origin">￥{{origin}}</text>
        </div>

        <div class="right">{{info.n}}人团</div>
      </div>

      <!-- 标题 -->
      <div class="title">{{info.title}}</div>
    </div>

    <!-- 配置 -->
    <div class="conf">
      <Conf v-bind="{ params, spec, banner }" @specChange="specChange"/>
    </div>

    <!-- 详情 -->
    <div class="info">
      <Info :list="info.details"/>
    </div>

    <!-- 评价 -->
    <div class="comments">
      <Comments :list="comments" :n="n" :good="good" :more="more"/>
    </div>

    <!-- 屏幕底部固定 购买 -->
    <div class="fixed">
      <!-- 返回首页 -->
      <div class="index in" @click="toIndex">
        <text class="iconfont icon-shouye"></text>
      </div>

      <!-- 分享 -->
      <button open-type="share" class="share in">
        <text class="iconfont icon-snimicfenxiang"></text>
      </button>

      <!-- 按钮 -->
      <div class="btn">
        <!-- 拼团商品 单独购买 / 拼团商品 加入购物车 -->
        <div class="single in" v-if="type !== 'seckill'" @click="cart">
          {{type === 'group' ? '单独购买' : '加入购物车'}}
        </div>

        <!-- 购买 秒杀 拼团 -->
        <div
          class="buy in"
          :style="{
            width: type === 'seckill' ? '100%' : '50%',
            backgroundColor:  type === 'seckill' && info.surplus === 0 ? '#999' : ''
          }"
          @click="pay">
          {{buy}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { details, comments } from '@/api'
import Info from './info'
import Comments from './comments/index'
import Conf from './conf/index'
import { time } from '@/utils'
import { mapState, mapActions } from 'vuex'

export default {
  components: { Info, Comments, Conf },
  data () {
    return {
      type: '',
      id: 0,
      info: {},
      loaded: false,
      // 评价
      comments: [],
      // 总共条数
      n: 0,
      // 好评率 0-1 小数
      good: 0,
      page: 1,
      more: '正在加载...',
      // 价格
      price: 0,
      origin: 0,
      // 配置选择索引
      specIndex: 0
    }
  },
  computed: {
    ...mapState(['logined']),
    banner () {
      return this.loaded ? this.info.img : []
    },
    params () {
      return this.loaded ? this.info.params : []
    },
    // 秒杀 倒计时
    seckillTime () {
      return `${time(this.info.time).h}:${time(this.info.time).m}:${time(this.info.time).s}`
    },
    // 购买按钮文字
    buy () {
      let text = ''
      switch (this.type) {
        case 'shop':
          text = '立即购买'
          break
        case 'seckill':
          if (this.info.surplus === 0) {
            text = '商品已售完'
          } else {
            text = '立即秒杀'
          }
          break
        case 'group':
          text = '发起拼团'
          break
      }
      return text
    },
    // 规格
    spec () {
      return this.loaded ? this.info.spec : []
    }
  },
  onLoad () {
    // const { type, id } = this.$root.$mp.query
    const { type } = this.$root.$mp.query
    this.type = type // shop seckill group
    // this.id = id
    switch (type) {
      case 'shop':
        this.id = 3
        break
      case 'seckill':
        this.id = 2
        break
      case 'group':
        this.id = 1
        break
    }
    this.get()
    this.getComments()
  },
  onUnload () {
    this.comments = []
    this.info = {}
    this.loaded = false
  },
  methods: {
    ...mapActions(['addCarts']),
    // 获取商品信息
    async get () {
      const res = await details({ id: this.id })
      if (res.code === 0) {
        this.info = res.data
        this.price = res.data.spec[0].price
        this.origin = res.data.spec[0].origin
        this.count()
      }
      this.loaded = true
    },
    // 获取评价
    async getComments () {
      const res = await comments({ page: this.page, limit: 10 })
      if (res.code === 0) {
        // 长度为0，则没有了
        if (!res.data.list.length) return true

        this.comments = this.comments.concat(res.data.list)
        this.n = res.data.n
        this.good = res.data.good
      }
    },
    // 秒杀倒计时
    count () {
      setInterval(() => {
        if (this.info.time < 0) return
        --this.info.time
      }, 1000)
    },
    // 返回首页
    toIndex () {
      wx.switchTab({ url: '/pages/index/main' })
    },
    // 购买
    pay () {
      if (!this.logined) {
        wx.showToast({ title: '未登录', icon: 'none' })
        return
      }

      // 秒杀商品 已售完
      if (this.type === 'seckill' && this.info.surplus === 0) return

      wx.navigateTo({ url: '/pages/pay/main?mode=' + this.type + '&id=' + this.id + '&spec=' + this.specIndex })
    },
    // 购物车 单买
    cart () {
      if (!this.logined) {
        wx.showToast({ title: '未登录', icon: 'none' })
        return
      }
      // 拼团商品 单买
      if (this.type === 'group') wx.navigateTo({ url: '/pages/pay/main?mode=group&alone=1&id=' + this.id + '&spec=' + this.specIndex })
      // 普通商品 加入购物车
      if (this.type === 'shop') {
        this.addCarts({ info: this.info, specId: this.spec[this.specIndex].id, n: 1 })
      }
    },
    specChange (index) {
      this.specIndex = index
    }
  },
  // 触底加载评价
  async onReachBottom () {
    ++this.page
    const res = await this.getComments()
    if (res) this.more = '没有更多了'
  },
  // 转发
  onShareAppMessage () {
    return {
      title: this.info.title,
      imageUrl: this.banner[0]
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  >>> .container
    padding 0 20rpx
  .banner
    .swiper
      height 750rpx
      .img
        height 750rpx
        width 750rpx
  .head
    width 100%
    .shop-price
    .title
      background-color #fff
      padding 20rpx
    // 普通商品价格
    .shop-price
      color $red - 10%
      font-size 35rpx
      font-weight 900
      font-style italic
    // 秒杀 拼团商品价格
    .seckill-price
    .group-price
      padding 40rpx 20rpx
      display flex
      justify-content space-between
      color #fff
      .left
        .price
          font-weight 900
          font-style italic
          font-size 35rpx
        .origin
          font-size 20rpx
          text-decoration-line line-through
          margin-left 10rpx
      .right
        font-size 25rpx
    .seckill-price
      background-color $red
    .group-price
      background -webkit-linear-gradient(left, blue, $red)
  .conf
    margin-top 20rpx
    background-color #fff
  .comments
    margin-bottom 100rpx
  // 固定底部 购买
  .fixed
    position fixed
    bottom 0
    left 0
    width 100%
    display flex
    font-size 35rpx
    // 水平垂直居中
    .in
      height 100rpx
      display flex
      align-items center
      justify-content center
    .index
    .share
      width 15%
      background-color #fff
      .iconfont
        font-size 45rpx
        color #666
    .share
      border-radius 0
      &::after
        border-radius 0
        border none
    .btn
      width 70%
      display flex
      .single
      .buy
        color #fff
      .single
        background-color $red + 50%
        width 50%
      .buy
        background-color $red
</style>
