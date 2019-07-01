<template>
  <div class="shop">
    <image class="img" :src="info.img ? info.img[4] : ''" mode="widthFix"></image>

    <div class="right">
      <div class="title">
        <div class="left">{{info.title}}</div>
        <div class="right">x1</div>
      </div>

      <div class="spec">{{spec}}</div>

      <div class="price">￥{{mode === 'group' && alone === 1 ? info.origin : info.price}}</div>
    </div>

    <div class="toast">赠运费险：延保365天</div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      default: () => {}
    },
    specIndex: {
      default: 0
    },
    mode: {
      default: ''
    },
    alone: {
      default: 0
    }
  },
  computed: {
    spec () {
      return Object.keys(this.info).length ? this.info.spec[this.specIndex].label : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.shop
  background-color #fff
  padding 20rpx
  .img
    width 20%
    vertical-align top
  .right
    display inline-block
    width 80%
    .title
      display flex
      .left
        width 80%
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        font-size 35rpx
      .right
        width 20%
        text-align right
    .spec
      margin-top 10rpx
    .price
      margin-top 10rpx
      font-weight 900
      font-size 35rpx
      color $red - 10%
      font-style italic
  .toast
    font-size 25rpx
    color $red
    margin-top 20rpx
</style>
