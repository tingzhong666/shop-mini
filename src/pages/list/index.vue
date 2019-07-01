<template>
  <div class="list">
    <div class="head">
      <Headq :sort="0" @change="change"/>
    </div>

    <div class="list">
      <Scrollq
        :mode="mode"
        :height="height"
        :list="list"
        :more="more"
        :top="top"
        @down="down"
        @click="click"/>
    </div>
  </div>
</template>

<script>
import Headq from './head'
import Scrollq from '@/components/scroll/index'
import { searchList, tabList } from '@/api'

export default {
  data () {
    return {
      mode: '', // search tab
      q: '', // 搜索关键词
      tabid: 0, // 分类id
      height: 0, // 滚动组件高度
      list: [], // 数据，
      more: '', // 触底提示消息,
      page: 1,
      // 控制滚动组件跳到顶部
      top: false
    }
  },
  components: {
    Headq,
    Scrollq
  },
  onUnload () {
    this.page = 1
    this.list = []
    this.more = ''
    this.top = false
  },
  onLoad () {
    const { mode, q, tabid } = this.$root.$mp.query
    this.mode = mode
    this.q = q
    this.tabid = tabid
    this.get({})
  },
  methods: {
    async get ({ sort = 0, more = false }) {
      const list = this.mode === 'search' ? await this.getSearchList(sort) : await this.getTabList(sort)
      if (!more) {
        this.list = list
        return
      }
      this.list = this.list.concat(list)
      // 长度为 0 返回 true
      if (!list.length) return true
    },
    // 点击排序
    async change (sort) {
      wx.showLoading()
      this.page = 1
      this.list = []
      this.more = ''
      this.top = true
      await this.get({ sort })
      wx.hideLoading()
      wx.pageScrollTo({ scrollTop: 0 })
    },
    // 触底事件
    async down () {
      this.top = false
      if (this.more === '已经到底了！') return
      this.more = '正在加载...'
      ++this.page
      const res = await this.get({ more: true })
      if (res) {
        // 已经到底
        this.more = '已经到底了！'
        return
      }
      this.more = ''
    },
    // 点击商品
    click (id) {
      wx.navigateTo({ url: '/pages/details/main?type=shop&id=' + id })
    },
    // mode tab列表获取
    async getTabList (sort = 0) {
      const res = await tabList({ tabid: this.tabid, sort, page: this.page })
      if (res.code === 0) {
        return res.data
      }
    },
    // mode search列表获取
    async getSearchList (sort = 0) {
      const res = await searchList({ q: this.q, sort, page: this.page })
      if (res.code === 0) {
        return res.data
      }
    },
    // 获取滚动组件高度
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
    }
  },
  mounted () {
    this.getHeight()
  }
}
</script>

<style lang="stylus" scoped>

</style>
