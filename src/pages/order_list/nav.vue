<template>
  <div class="nav">
    <div class="list">
      <div
        class="li"
        v-for="item in nav"
        :key="item"
        @click="click(item)"
        :class="{
          active: mode === item.mode
        }">
        {{item.label}}
      </div>
    </div>

    <!-- 下划线切换动画 -->
    <div class="unline" :style="{ left: left }"></div>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      mode: Number,
      default: 0
    },
    nav: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    left () {
      return this.mode * 25 + '%'
    }
  },
  methods: {
    click (item) {
      this.mode = item.mode
      this.$emit('change', this.mode)
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav
  position relative
  .list
    display flex
    background-color #fff
    height 80rpx
    line-height 80rpx
    > div
      width 25%
      text-align center
      &.active
        color $red
  .unline
    width 25%
    position absolute
    bottom 0
    left 0
    height 5rpx
    background-color $red
    transition left .3s
</style>
