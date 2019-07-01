<template>
  <div id="address">
    <div class="address" v-if="isAddress" @click="change">
      <div class="name">
        <div class="left">{{address.name + ' ' + address.phone}}</div>
        <div class="iconfont icon-zuojiankuohao"></div>
      </div>

      <div class="bottom">
        <div class="iconfont icon-dizhiguanli"></div>
        <div class="right">
          <div class="address">{{addr}}</div>
          <div class="details">{{address.details}}</div>
        </div>
      </div>
    </div>

    <div class="not" v-if="!isAddress" @click="add">
      <div class="left">
        <text class="iconfont icon-icon02"></text>
        添加地址
      </div>
      <div class="iconfont icon-zuojiankuohao"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['address']),
    addr () {
      return Object.keys(this.address).length ? this.address.address.join(' ') : ''
    },
    isAddress () {
      return Object.keys(this.address).length
    }
  },
  methods: {
    // 进入地址选择
    change () {
      wx.navigateTo({ url: '/pages/addresslist/main?mode=select' })
    },
    // 添加地址
    add () {
      wx.navigateTo({ url: '/pages/address/main?mode=select&black=1' })
    }
  }
}
</script>

<style lang="stylus" scoped>
#address
  background-color #fff
  padding 20rpx
  > .address
    .name
      display flex
      justify-content space-between
      font-size 35rpx
    .bottom
      margin-top 10rpx
      color #666
      .iconfont
        width 7%
        display inline-block
        position relative
        bottom 20rpx
      .right
        display inline-block
        width 93%
  .not
    display flex
    justify-content space-between
    font-size 35rpx
</style>
