<template>
  <div class="li">
    <!-- 图片 -->
    <div class="img">
      <image class="img" :src="item.img" mode="widthFix"></image>
    </div>

    <!-- 详细 -->
    <div class="info">
      <div class="title">
        <div class="title">{{item.title}}</div>
        <!-- 数量 -->
        <div class="n">x{{item.n}}</div>
      </div>

      <!-- 规格 -->
      <div class="spec">{{item.spec}}</div>

      <!-- 单价 -->
      <div class="price">￥{{item.price}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="stylus" scoped>
.li
  background-color #eee
  margin-bottom 20rpx
  display flex
  padding 20rpx
  > .img
    width 20%
    .img
      width 100%
  .info
    width 80%
    > .title
      display flex
      justify-content space-between
      width 100%
      .title
        width 70%
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .n
        width 30%
        text-align right
    .spec
      margin 10rpx 0
      font-size 25rpx
    .price
      color $red - 10%
</style>
