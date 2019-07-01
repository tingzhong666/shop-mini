<template>
  <div id="address">
    <form @submit="keep">
      <div class="name">
        <div class="label">收获姓名</div>
        <input type="text" name="name" :value="name" placeholder="请输入您的收货人姓名" confirm-type="next">
      </div>

      <div class="phone">
        <div class="label">手机号码</div>
        <input type="number" name="phone" :value="phone" placeholder="请输入您的手机号码" confirm-type="next">
      </div>

      <div class="address">
        <div class="label">选择区域</div>
        <picker :class="{ select: !address.length }" mode="region" name="address" :value="address" @change="change">
          {{ address.length ? address[0] + ' ' + address[1] + ' ' + address[2] : '请选择省都市'}}
        </picker>
        <div class="iconfont icon-zuojiankuohao"></div>
      </div>

      <div class="details">
        <div class="label">详细地址</div>
        <input type="text" name="details" :value="details" placeholder="请输入您的详细地址" confirm-type="next">
      </div>

      <div class="def">
        <switch :checked="def" name="default">默认地址</switch>
      </div>

      <div class="btn">
        <button class="keep" hover-class="hover" form-type="submit">保存</button>
        <button class="delete" hover-class="hover" v-if="mode === 'modify'" @click="rm">删除</button>
      </div>
    </form>
  </div>
</template>

<script>
import { address } from '@/api'

export default {
  data () {
    return {
      mode: '', // add modify select
      // 修改的id
      id: '',
      // 获取信息
      info: {},
      // 地址选择存放
      address: [],
      // 默认地址
      def: false,
      // mode === select 时有效 回退页面数
      black: 0
    }
  },
  computed: {
    // 姓名
    name () {
      return Object.keys(this.info).length ? this.info.name : ''
    },
    // 手机
    phone () {
      return Object.keys(this.info).length ? this.info.phone : ''
    },
    // 详细地址
    details () {
      return Object.keys(this.info).length ? this.info.details : ''
    }
  },
  onLoad () {
    const { mode, id, back } = this.$root.$mp.query
    this.mode = mode
    this.id = id
    this.back = back
    if (mode === 'modify') this.get()
  },
  onUnload () {
    this.mode = ''
    this.info = {}
    this.address = []
    this.def = false
    this.back = 0
  },
  methods: {
    async get () {
      const res = await address({ id: this.id })
      if (res.code === 0) {
        this.info = res.data
        this.address = res.data.address
        this.def = res.data.default
      }
    },
    // 地址选择
    change (e) {
      this.address = e.mp.detail.value
    },
    // 点击保存
    keep (e) {
      let form = e.mp.detail.value
      form.phone = form.phone * 1
      console.log(form)
      wx.showToast({ title: '没有接口', icon: 'none' })
      // if 有接口 && mode === select 表示从下单页面跳转过来
      // 数据发送成功后 设置此项为 下单地址
      // this.$store.commit('setAddress', form)
      // 并 回退
      // wx.navigateBack({ delta: this.back })
    },
    // 删除
    rm () {
      wx.showToast({ title: '没有接口', icon: 'none' })
    }
  }
}
</script>

<style lang="stylus" scoped>
#address
  background-color #fff
  padding 0 40rpx
  .name
  .phone
  .address
  .details
  .def
    display flex
    padding 40rpx 0
    border-bottom 1rpx solid #eee
    .label
      width 20%
    input
      position relative
      top -5rpx
  .address
    position relative
    .iconfont
      position absolute
      right 0
      top 40rpx
      color #999
    .select
      color #888
  .def
    border none
    .text
      position relative
      top 10rpx
      left 10rpx
  .btn
    position fixed
    bottom 0
    left 0
    width 100%
    padding 20rpx 0
    background-color #fff
    button
      border-radius 0
      width 710rpx
      &::after
        border none
    .keep
      background-color $red
      color #fff
      &.hover
        background-color $red + 30%
    .delete
      margin-top 10rpx
      border 1rpx solid $red
      color $red
      &.hover
        background-color $red + 70%
        color $red + 30%
</style>
