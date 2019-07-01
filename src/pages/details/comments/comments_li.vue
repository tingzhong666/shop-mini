<template>
  <div class="li">
    <div class="head">
      <!-- 头像 -->
      <image class="img" :src="item.img" mode="widthFix"></image>

      <div class="right">
        <div class="title">
          <div class="text">{{item.username}}</div>

          <div class="star">{{item.star}}</div>
        </div>

        <!-- 时间 -->
        <div class="time">{{time}}</div>
      </div>
    </div>

    <div class="content">
      <div class="text">{{item.content}}</div>

      <div class="peitu">
        <image :src="url" class="img" v-for="url in item.imgs" mode="widthFix" :key="url"/>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from '@/utils'

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    time () {
      return date(this.item.created_time)
    }
  }
}
</script>

<style lang="stylus" scoped>
.li
  background-color #fff
  margin-bottom 20rpx
  padding 20rpx
  .head
    display flex
    .img
      width 10%
      border-radius 50%
    .right
      width 90%
      display flex
      justify-content space-between
      position relative
      top 10rpx
      left 10rpx
  .content
    margin-top 20rpx
    .peitu
      margin-top 10rpx
      .img
        width 30%
        margin-right 3.3%
</style>
