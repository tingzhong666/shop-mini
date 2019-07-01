<template>
  <div class="index">
    <div class="head">
      <div class="bgc"></div>

      <div class="list">
        <Listq mode="group" :list="front"/>
      </div>
    </div>

    <div class="scroll">
      <Scrollq
        :height="height"
        mode="group"
        :more="more"
        @down="down"
        @click="click"
        :list="after"/>
    </div>
  </div>
</template>

<script>
import { group } from '@/api'
import Listq from '@/components/list'
import Scrollq from '@/components/scroll/index'

export default {
  data () {
    return {
      list: [],
      page: 1,
      more: '',
      height: 0
    }
  },
  computed: {
    // 前三
    front () {
      return this.list.length ? this.list.slice(0, 3) : []
    },
    // 非前三
    after () {
      return this.list.length ? this.list.slice(3) : []
    }
  },
  components: {
    Listq,
    Scrollq
  },
  methods: {
    async get () {
      const res = await group({ limit: 10, page: this.page })
      if (res.code === 0) {
        if (res.data.length === 0) return true
        this.list = this.list.concat(res.data)
      }
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
    click (id) {
      wx.navigateTo({ url: '/pages/details/main?type=group&id=' + id })
    },
    // 触底加载
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
    }
  },
  onLoad () {
    wx.showLoading()
    this.get()
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
    padding-bottom 20rpx
    .bgc
      background -webkit-linear-gradient(left, blue, $red)
      width 100%
      height 300rpx
    .list
      margin-top -250rpx
</style>
