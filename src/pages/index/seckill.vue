<template>
  <div class="seckill">
    <div class="title">
      <div class="left">秒杀</div>
      <div class="timed">
        {{timed.h}}
        <div class="delimiter">:</div>
        {{timed.m}}
        <div class="delimiter">:</div>
        {{timed.s}}
      </div>
      <navigator class="right" hover-class="none" url="/pages/seckill/main">更多></navigator>
    </div>

    <div class="main">
      <listq :list="list" mode="seckill"/>
    </div>
  </div>
</template>

<script>
import listq from '@/components/list'
import { time } from '@/utils'

export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    list () {
      return this.info.list || []
    },
    timed () {
      const timed = this.info.timed || 0
      return time(timed)
    }
  },
  components: {
    listq
  },
  methods: {
    // 秒杀倒计时
    count () {
      setInterval(() => {
        if (this.timed.origin === 0) return
        --this.info.timed
      }, 1000)
    }
  },
  mounted () {
    this.count()
  }
}
</script>

<style lang="stylus" scoped>
.seckill
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
    .timed
      background -webkit-linear-gradient(left, blue, $red)
      font-size 25rpx
      color #fff
      padding 0 10rpx
      height 45rpx
      transform skewX(-15deg)
      div
        display inline-block
        padding 10rpx 0
      // 分隔符 冒号
      .delimiter
        background-color #fff
        color #000
        padding 10rpx 10rpx
        font-weight 900
        margin-top -1rpx
  .main
    padding 40rpx
</style>
