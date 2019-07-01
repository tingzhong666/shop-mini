<template>
  <div class="index">
    <div class="search">
      <Search @submit="submit"/>
    </div>

    <!-- 热搜 -->
    <div class="hot">
      <Hot :list="hotList"/>
    </div>

    <!-- 历史搜索 -->
    <div class="history" v-if="history.length">
      <div class="hr"></div>
      <History :list="history" @clear="clear"/>
    </div>
  </div>
</template>

<script>
import Search from './search'
import Hot from './hot'
import { hotKey } from '@/api'
import History from './history'

export default {
  data () {
    return {
      // 热搜
      hotList: [],
      // 历史搜索
      history: []
    }
  },
  components: {
    Search,
    Hot,
    History
  },
  methods: {
    submit (q) {
      // 内容为空
      if (!q) return

      const res = this.history.find(item => item === q)
      // 搜索词在历史搜索中不存在
      if (!res) {
        this.history.push(q)
        wx.setStorage({
          key: 'history',
          data: this.history
        })
      }

      wx.navigateTo({ url: '/pages/list/main?mode=search&q=' + this.q })
    },
    // 获取热词
    async get () {
      const res = await hotKey()
      if (res.code === 0) {
        this.hotList = res.data
      }
    },
    // 获取历史搜索
    getHistory () {
      wx.getStorage({
        key: 'history',
        success: res => {
          this.history = res.data
        },
        fail: () => {
          wx.setStorage({
            key: 'history',
            data: []
          })
        }
      })
    },
    // 清空历史搜索
    clear () {
      this.history = []
      wx.setStorage({
        key: 'history',
        data: []
      })
    }
  },
  onLoad () {
    this.get()
    this.getHistory()
  }
}
</script>

<style lang="stylus" scoped>
.index
  .hot
    margin-top 40rpx
  .history
    .hr
      width 100%
      height 20rpx
      background-color $bgc
    margin
</style>

<style lang="stylus">
page
  background-color #fff
.container
  padding 0 20rpx
</style>

