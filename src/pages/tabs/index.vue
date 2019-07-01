<template>
  <div class="index">
    <!-- 左 -->
    <div class="left">
      <left
        :height="height"
        :list="tabs"
        @change="change"/>
    </div>

    <!-- 右 -->
    <div class="right">
      <right :height="height" :list="twotabs"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import left from './left'
import right from './right'
import { twoTabs } from '@/api'

export default {
  data () {
    return {
      height: 0,
      twotabs: []
    }
  },
  computed: {
    ...mapState(['tabs', 'active'])
  },
  components: {
    left,
    right
  },
  methods: {
    ...mapMutations(['setActive']),
    getHeight () {
      wx.getSystemInfo({
        success: res => {
          this.height = res.windowHeight
        }
      })
    },
    // 点击不同的一级分类
    change (current) {
      this.setActive(current.label)
      this.getTwo()
    },
    // 获取二级分类
    async getTwo () {
      wx.showLoading({ title: '正在加载' })
      const id = this.tabs.find(item => item.label === this.active).id

      const res = await twoTabs({ id })
      if (res.code === 0) {
        this.twotabs = res.data
      }
      wx.hideLoading()
    }
  },
  onLoad () {
    this.getHeight()
  },
  onShow () {
    this.getTwo()
  }
}
</script>

<style lang="stylus" scoped>
.index
  display flex
  .left
    width 150rpx
  .right
    width 600rpx
</style>
