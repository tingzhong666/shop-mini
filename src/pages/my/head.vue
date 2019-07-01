<template>
  <div id="head">
    <!-- 用户栏 -->
    <button open-type="getUserInfo" class="user" @getuserinfo="login" hover-class="none">
      <!-- 头像 -->
      <image class="img" :src="img"></image>

      <!-- 用户名 -->
      <div class="username">{{username}}</div>
    </button>

    <!-- 订单栏 -->
    <div class="order">
      <!-- 全部订单 -->
      <div class="head" @click="to('全部')">
        <div class="text">全部订单</div>

        <div class="right"><text class="iconfont icon-zuojiankuohao"></text></div>
      </div>

      <!-- 不同状态订单 -->
      <div class="content">
        <div v-for="item in list" :key="item.label" @click="to(item.label)">
          <text class="iconfont" :class="item.iconfont"></text>
          {{item.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api'
import { setStorage } from '@/utils'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      list: [
        {
          iconfont: 'icon-dingwei-',
          label: '全部'
        },
        {
          iconfont: 'icon-daifahuo',
          label: '待发货'
        },
        {
          iconfont: 'icon-daifukuan',
          label: '代付款'
        },
        {
          iconfont: 'icon-pingjia',
          label: '评价'
        }
      ]
    }
  },
  computed: {
    ...mapState(['logined', 'userInfo']),
    // 用户名
    username () {
      return this.logined ? this.userInfo.nickName : '点击登录'
    },
    // 头像
    img () {
      return this.logined ? this.userInfo.avatarUrl : '/static/img/touxiang.jpg'
    }
  },
  methods: {
    ...mapActions(['init']),
    ...mapMutations(['setLogined', 'setUserInfo']),
    async login (e) {
      // 是否已经登录
      if (this.logined) return

      // 是否授权
      const msg = e.mp.detail.errMsg
      if (msg === 'getUserInfo:fail auth deny') return

      // 登录
      wx.showLoading({ title: '登录中' })
      const res = await login()
      setStorage({ key: 'openid', data: res.data.openid })
      if (res) {
        this.setUserInfo(e.mp.detail.userInfo)
        this.setLogined(true)
        wx.showToast({ title: '登录成功', icon: 'none' })
        this.init()
      }
    },
    // 去往订单列表
    to (label) {
      if (!this.logined) {
        wx.showToast({ title: '未登录', icon: 'none' })
        return
      }

      switch (label) {
        case '全部':
          wx.navigateTo({ url: '/pages/order_list/main?mode=0' })
          break
        case '待发货':
          wx.navigateTo({ url: '/pages/order_list/main?mode=2' })
          break
        case '代付款':
          wx.navigateTo({ url: '/pages/order_list/main?mode=1' })
          break
        case '评价':
          wx.navigateTo({ url: '/pages/evaluate/main?mode=0' })
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// 渐变 黄
$yellow = #FFB21A
$yellow-before = #F8E1AD
// 渐变 黑
$black = #211D1E
$black-before = #746A75

#head
  background -webkit-linear-gradient(left, $yellow-before, $yellow)
  padding 20rpx
  padding-bottom 0
  border-radius 0 0 50% 50%
  height 400rpx
  width 170%
  position relative
  overflow hidden
  left -37%
  font-size 25rpx
  .user
  .order
    bottom 0
    left 50%
    transform translateX(-50%)
    width 710rpx
  // 用户栏
  .user
    position relative
    padding 20rpx
    background-color #00000000
    display flex
    justify-content flex-start
    transform translateX(-90%)
    &::after, &::before
      border none
    .img
      width 100rpx
      height 100rpx
      border-radius 50%
      vertical-align middle
    .username
      display inline-block
      margin-left 50rpx
      font-size 35rpx
  // 订单栏
  .order
    background -webkit-linear-gradient(left, $black-before, $black)
    color $yellow
    border-radius 50rpx 50rpx 0 0
    padding-bottom 50rpx
    position absolute
    // 全部订单
    .head
      padding 40rpx
      display flex
      justify-content space-between
    // 不同状态订单
    .content
      display flex
      justify-content space-around
      > div
        display flex
        flex-direction column
        text-align center
        .iconfont
          margin-bottom 10rpx
          font-size 40rpx
</style>
