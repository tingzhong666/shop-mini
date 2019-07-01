<template>
  <div class="func">
    <button
      class="li"
      v-for="item in list"
      :key="item.label"
      hover-class="hover"
      @click="to(item)">
      <text class="iconfont left" :class="item.iconfont"></text>
      <div class="label">{{item.label}}</div>
      <text class="iconfont icon-zuojiankuohao"></text>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      list: [
        {
          label: '地址管理',
          iconfont: 'icon-dizhiguanli'
        },
        {
          label: '设置',
          iconfont: 'icon-shezhi'
        }
      ]
    }
  },
  computed: {
    ...mapState(['logined'])
  },
  methods: {
    ...mapActions(['logout']),
    to (item) {
      if (!this.logined && item.label !== '设置') {
        wx.showToast({ title: '未登录', icon: 'none' })
        return
      }

      switch (item.label) {
        case '地址管理':
          wx.navigateTo({ url: '/pages/addresslist/main' })
          break
        case '设置':
          this.power()
          break
      }
    },
    // 授权
    power () {
      wx.openSetting({
        success: res => {
          // 取消授权用户信息
          if (!res.authSetting['scope.userInfo']) this.logout()
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.func
  background-color #fff
  border-radius 10rpx
  overflow hidden
  .li
    display flex
    border-bottom 1rpx solid #eee
    border-radius 0
    &::after
      border none
    &:last-child
      border none
    &.hover
      background-color #fff - 10%
    .iconfont
      width 10%
      text-align center
    .label
      width 80%
      text-align left
      font-size 30rpx
    .left
      color $red
    .icon-zuojiankuohao
      color #ccc
</style>
