<template>
  <div class="n-input">
    <!-- - -->
    <div class="reduce" :class="{ invalid: n === min }" @click="reduce">-</div>

    <!-- input -->
    <div class="n">{{n}}</div>

    <!-- + -->
    <div class="plus" :class="{ invalid: n === max }" @click="plus">+</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      n: this.init
    }
  },
  props: {
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    init: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 减
    reduce () {
      if (this.n === this.min) return

      --this.n
      this.$emit('change', this.n)
    },
    // 加
    plus () {
      if (this.n === this.max) return

      ++this.n
      this.$emit('change', this.n)
    }
  }
}
</script>

<style lang="stylus" scoped>
.n-input
  display flex
  width 200rpx
  border 1rpx solid #eee
  height 50rpx
  border-radius 10rpx
  > div
    display flex
    align-items center
    justify-content center
  .reduce
  .plus
    width 30%
    &.invalid
      background-color #00000010
  .n
    width 40%
    border-left 1rpx solid #eee
    border-right 1rpx solid #eee
</style>
