<template>
  <div class="hot">
    <div class="container">
      <div class="title">热门搜索</div>

      <div class="tags">
        <div class="tag" v-for="item in list" :key="item" @click="click(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    click (item) {
      wx.navigateTo({ url: '/pages/list/main?mode=search&q=' + item })
    }
  }
}
</script>

<style lang="stylus" scoped>
.hot
  margin-bottom 40rpx
  .title
    font-size 30rpx
    margin-bottom 30rpx
  .tags
    .tag
      display inline-block
      background-color $bgc
      margin 0 20rpx 20rpx 0
      padding 5rpx 10rpx
      color #666
      border-radius 3rpx
      font-size 25rpx
</style>
