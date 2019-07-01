<template>
  <div class="index">
    <div class="head">
      <!-- 正在秒杀 -->
      <div class="being">
        <div class="time">{{being.h}}：{{being.m}}：{{being.s}}</div>
        <div class="text">正在秒杀</div>
      </div>
      <!-- 即将开放 -->
      <div class="soon">
        <div class="time">{{soonq.h}}：{{soonq.m}}：{{soonq.s}}</div>
        <div class="text">即将开放</div>
      </div>
    </div>

    <div class="scroll">
      <Scrollq
        :more="more"
        :list="list"
        :height="height"
        @down="down"
        mode="seckill"
        @click="click"/>
    </div>
  </div>
</template>

<script>
import { seckill } from '@/api'
import { time } from '@/utils'
import Scrollq from '@/components/scroll/index'

export default {
  data () {
    return {
      list: [],
      page: 1,
      timed: 0,
      soon: 0,
      height: 0,
      more: ''
    }
  },
  computed: {
    being () {
      return time(this.timed)
    },
    soonq () {
      return time(this.soon)
    }
  },
  components: {
    Scrollq
  },
  methods: {
    async get () {
      const res = await seckill({ limit: 10, page: this.page })

      if (res.code === 0) {
        if (res.data.list.length === 0) return true
        this.list = this.list.concat(res.data.list)
        this.timed = res.data.timed
        this.soon = res.data.soon
      }
    },
    // 倒计时
    count (n) {
      setInterval(() => {
        if (this[n] === 0) return
        --this[n]
      }, 1000)
    },
    // 得出滚动组件高度
    getHeight () {
      const query = wx.createSelectorQuery()
      query.select('.head').boundingClientRect(res => {
        const headHeight = res.height
        wx.getSystemInfo({
          success: res => {
            this.height = res.windowHeight - headHeight
          }
        })
      }).exec()
    },
    // 触底加载事件
    async down () {
      if (this.more === '已经到底了！') return
      this.more = '正在加载...'
      ++this.page
      const res = await this.get()
      if (res) {
        // 已经到底
        this.more = '已经到底了！'
        return
      }
      this.more = ''
    },
    // 点击商品
    click (id) {
      wx.navigateTo({ url: '/pages/details/main?type=seckill&id=' + id })
    }
  },
  async onLoad () {
    wx.showLoading()
    await this.get()
    this.count('timed')
    this.count('soon')
  },
  mounted () {
    this.getHeight()
    wx.hideLoading()
  }
}
</script>

<style lang="stylus" scoped>
.index
  .head
    background-color $red
    display flex
    justify-content space-around
    padding 40rpx 0 80rpx
    text-align center
    .being
      color #fff
    .soon
      color #ffffff90
  .scroll
    margin-top -50rpx
    padding 0 20rpx
</style>
