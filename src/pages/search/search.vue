<template>
  <div class="search">
    <div class="container">
      <input
        v-model="q"
        class="input"
        type="text"
        focus
        @confirm="submit"
        placeholder="华为P20"
        confirm-type="search">

      <cover-image class="icon" @click="clear" src="/static/img/cha.png"></cover-image>

      <navigator class="cancel" open-type="navigateBack">取消</navigator>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      q: ''
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.q)
    },
    clear () {
      this.q = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.search
  position relative
  .input
    background-color $bgc
    padding 10rpx
    width 600rpx
    display inline-block
  .icon
    position absolute
    right 120rpx
    top 12rpx
    z-index 1000
    width 48rpx
    height 40rpx
  .cancel
    display inline-block
    position relative
    bottom 15rpx
    left 20rpx
</style>
