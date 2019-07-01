<template>
  <div class="tabs">
    <div
      class="li"
      @click="click(item.label)"
      v-for="item in list"
      :key="item.id">
      <img :src="item.img" class="img">
      <div class="label">{{item.label}}</div>
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
    click (label) {
      this.$store.commit('setActive', label)
      wx.switchTab({ url: '/pages/tabs/main' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs
  display flex
  justify-content space-around
  color #fff
  font-size 30rpx
  .li
    display flex
    flex-direction column
    .img
      width 100rpx
      height 100rpx
    .label
      text-align center
</style>
