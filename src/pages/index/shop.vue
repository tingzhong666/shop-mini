<template>
  <div class="shop">
    <div class="title">
      <div class="left">猜你喜欢</div>
    </div>

    <div class="main">
      <listq :list="list" mode="shop"/>
    </div>
  </div>
</template>

<script>
import listq from '@/components/list'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    listq
  }
}
</script>

<style lang="stylus" scoped>
.shop
  .title
    display flex
    background-color #fff
    justify-content space-between
    padding 20rpx 0
    .left
      border-left 10rpx solid $red
      padding-left 20rpx
  .main
    padding 20rpx
</style>
