<template>
  <scroll-view
    class="left"
    :style="{ height: height + 'px' }"
    scroll-y>
    <div
      v-for="item in list"
      :key="item.id"
      :class="{ active: active === item.label }"
      @click="click(item)"
      class="li">
      {{item.label}}
    </div>
  </scroll-view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['active'])
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapMutations(['setActive']),
    // 点击
    click (current) {
      if (current.label === this.active) return
      this.setActive(current.label)
      this.$emit('change', current)
    }
  }
}
</script>

<style lang="stylus" scoped>
.left
  .li
    padding 20rpx 0
    text-align center
    font-size 30rpx
    transition border .3s, background-color .3s
    &.active
      border-left 10rpx solid $red
      background-color #fff
</style>
