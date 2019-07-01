<template>
  <div class="checkbox" :class="{ active: checked, not: !checked }" @click="change">
    <text class="iconfont icon-icon-test" v-if="checked"></text>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change () {
      this.$emit('change')
    }
  }
}
</script>

<style lang="stylus" scoped>
.checkbox
  border-radius 50%
  width 40rpx
  height 40rpx
  &.active
    background-color $red
    color #fff
    text-align center
    border 1rpx solid $red
  &.not
    border 1rpx solid #999
</style>
