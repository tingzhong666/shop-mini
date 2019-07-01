<template>
  <div class="comments">
    <div class="head">
      <div class="container">
        <div class="left">用户评价({{n}})</div>

        <div class="good">{{good * 100}}%好评</div>
      </div>
    </div>

    <div class="list container">
      <Liq
        v-for="item in list"
        :key="item"
        :item="item"/>
    </div>

    <div class="more">{{more}}</div>
  </div>
</template>

<script>
import Liq from './comments_li'

export default {
  components: { Liq },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    n: {
      type: Number,
      default: 0
    },
    good: {
      type: Number,
      default: 0
    },
    more: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.comments
  .head
    background-color #fff
    padding 20rpx 0
    .container
      display flex
      justify-content space-between
      .good
        font-size 25rpx
        color $red
  .list
    margin-top 20rpx
  .more
    text-align center
    margin-bottom 20rpx
</style>
