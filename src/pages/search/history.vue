<template>
  <div class="history">
    <div class="container">
      <div class="title">
        历史搜索
        <image @click="clear" class="img" src="/static/img/remove.png" mode="aspectFit"></image>
      </div>

      <div class="content">
        <view
          @click="click(item)"
          class="li"
          hover-class="hover"
          v-for="item in list"
          :key="item">{{item}}</view>
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
    clear () {
      this.$emit('clear')
    },
    click (item) {
      wx.navigateTo({ url: '/pages/list/main?mode=search&q=' + item })
    }
  }
}
</script>

<style lang="stylus" scoped>
.history
  padding-top 40rpx
  .title
    font-size 35rpx
    position relative
    margin-bottom 20rpx
    .img
      width 50rpx
      height 70rpx
      position absolute
      right 0
      top -15rpx
  .content
    .li
      padding 20rpx 10rpx
      border-bottom 1rpx solid #eee
      &.hover
        background-color #eee
</style>
