<template>
  <div class="tag">{{label}}</div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.tag
  display inline-block
  border 2rpx solid #eee
  border-radius 3rpx
  font-size 25rpx
  color #666
  padding 3rpx 15rpx
</style>
