<template>
  <div class="cost">
    <div class="li" v-for="item in list" :key="item.label">
      <div class="label">{{item.label}}</div>
      <div class="right" :class="{ price: item.label === '价格' }">{{item.text}}</div>
    </div>

    <div class="li">
      <div class="label">备注</div>
      <input class="right input" placeholder="用户选填" :value="remarks" @input="change">
    </div>
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
    remarks: {
      default: ''
    }
  },
  computed: {
    list () {
      return [
        {
          label: '发票',
          text: '请联系客服索取'
        },
        {
          label: '价格',
          text: Object.keys(this.info).length ? '￥' + this.info.spec[this.specIndex].price : ''
        },
        {
          label: '运费',
          text: this.info.freight
        }
      ]
    }
  },
  methods: {
    // 备注
    change (e) {
      const v = e.mp.detail.value
      this.$emit('change', v)
    }
  }
}
</script>

<style lang="stylus" scoped>
.cost
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
