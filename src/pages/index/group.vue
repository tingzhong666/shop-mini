<template>
  <div class="group">
    <div class="title">
      <div class="left">拼团</div>
      <navigator class="right" hover-class="none" url="/pages/group/main">更多></navigator>
    </div>

    <div class="main">
      <listq :list="list" mode="group"/>
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
.group
  .title
    display flex
    background-color #fff
    justify-content space-between
    padding 20rpx 0
    .left
      border-left 10rpx solid $red
      padding-left 20rpx
    .right
      padding-right 20rpx
  .main
    padding 40rpx
</style>
