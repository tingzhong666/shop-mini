<template>
  <div class="bill">
    <div class="li">
      <div class="label">发票</div>
      <div class="right">请联系客服索取</div>
    </div>

    <div class="li">
      <div class="label">总价格</div>
      <div class="right price">￥{{allPrice}}</div>
    </div>

    <div class="li">
      <div class="label">总运费</div>
      <div class="right price">￥{{allFreight}}</div>
    </div>

    <div class="li">
      <div class="label">备注</div>
      <input class="right input" placeholder="用户选填" @input="change">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 总价
    allPrice: {
      type: Number,
      default: 0
    },
    // 总运费
    allFreight: {
      type: Number,
      deafult: 0
    }
  },
  methods: {
    // 备注
    change (e) {
      this.$emit('input', e.mp.detail.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.bill
  background-color #fff
  padding 1rpx 20rpx
  .li
    display flex
    justify-content space-between
    margin 30rpx 0
    .input
      text-align right
    .price
      color $red - 10%
</style>
