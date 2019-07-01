<template>
  <div class="head">
    <!-- 综合 -->
    <div
      class="comprehensive"
      @click="click(0)"
      :class="{ active: sort === 0 }">
      综合
    </div>

    <!-- 价格排序 -->
    <div
      class="price"
      @click="click(2)"
      :class="{ active: sort === 2 || sort === 3 }">
      价格
      <text class="iconfont icon-up" :class="{ active: sort === 2 }"></text>
      <text class="iconfont icon-down" :class="{ active: sort === 3 }"></text>
    </div>

    <!-- 销量 -->
    <div
    class="amount"
    @click="click(1)"
    :class="{ active: sort === 1 }">销量</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 排序 0 综合 1 销量 2 价格升序 3 价格降序
      sort: this.initSort
    }
  },
  props: {
    initSort: {
      type: Number,
      default: 0
    }
  },
  methods: {
    click (id) {
      this.change(id)
      this.$emit('change', this.sort)
    },
    // 点击排序
    change (id) {
      if (id === 2 & this.sort === 3) {
        this.sort = 2
        return
      }
      if (id === 2 & this.sort === 2) {
        this.sort = 3
        return
      }
      if (this.sort === id) return
      this.sort = id
    }
  }
}
</script>

<style lang="stylus" scoped>
.head
  background-color #fff
  display flex
  justify-content space-around
  padding 30rpx 0
  font-size 25rpx
  .comprehensive
  .price
  .amount
  .iconfont
    &.active
      color $red
  .iconfont
    color #333
    font-size 20rpx
  .price
    position relative
    .icon-up
      position absolute
      right -20rpx
      top 5rpx
    .icon-down
      position absolute
      right -20rpx
      bottom 0
</style>
