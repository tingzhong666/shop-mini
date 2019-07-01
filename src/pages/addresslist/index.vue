<template>
  <div class="addresslist">
    <!-- 添加按钮 -->
    <div class="btn" @click="add">
      <text class="iconfont icon-icon02"></text>
      添加新地址
    </div>

    <!-- 地址列表 -->
    <scroll
      v-if="list.length"
      class="list"
      :style="{ height: height + 'px' }"
      scroll-y>
      <!-- 默认 -->
      <view hover-class="hover" class="li" v-for="item in list" :key="item.id" @click="modify(item)">
        <div class="name">{{item.name + ' ' + item.phone}}</div>
        <div class="address">{{item.address}}</div>
        <div class="details">{{item.details}}</div>
        <!-- 默认 -->
        <div class="def" v-if="item.default">默认</div>
      </view>
    </scroll>

    <div class="not" v-if="!list.length">暂无记录</div>
  </div>
</template>

<script>
import { addressList } from '@/api'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      list: [],
      height: 0,
      mode: '' // select common
    }
  },
  methods: {
    ...mapMutations(['setAddress']),
    // 得出滚动列表高度
    getHeight () {
      const query = wx.createSelectorQuery()
      query.select('.btn').boundingClientRect(res => {
        const btnHeight = res.height
        wx.getSystemInfo({
          success: res => {
            this.height = res.windowHeight - btnHeight
          }
        })
      }).exec()
    },
    // 获取地址列表
    async get () {
      const res = await addressList()
      if (res.code === 0) {
        this.list = res.data
      }

      if (res.code === -1) {
        wx.showToast({ title: '未登录', icon: 'none' })
      }
    },
    // 添加
    add () {
      // 由订单页面跳转过来
      if (this.mode === 'select') {
        // select 表示添加 并设为下单地址 并回退到订单页面 回退2个页面
        wx.navigateTo({ url: '/pages/address/main?mode=select&black=2' })
        return
      }
      wx.navigateTo({ url: '/pages/address/main?mode=add' })
    },
    // 修改 / 查看
    modify (item) {
      // 由订单页面跳转过来
      if (this.mode === 'select') {
        // 选择此项为为下单地址
        this.setAddress(item)
        // 并回退到下单页面
        wx.navigateBack({ delta: 1 })
        return
      }
      wx.navigateTo({ url: '/pages/address/main?mode=modify&id=' + item.id })
    }
  },
  onLoad () {
    const { mode } = this.$root.$mp.query
    this.mode = mode
    this.get()
  },
  onUnload () {
    this.list = []
  },
  mounted () {
    this.getHeight()
  }
}
</script>

<style lang="stylus" scoped>
.addresslist
  .btn
    position fixed
    bottom 0
    left 0
    background-color $red
    color #fff
    width 100%
    text-align center
    font-size 35rpx
    padding 30rpx 0
    .iconfont
      font-size 50rpx
      position relative
      bottom -5rpx
  .not
    font-size 35rpx
    text-align center
    margin-top 100rpx
    color #999
  .list
    .li
      margin 20rpx
      margin-top 0
      background-color #fff
      padding 20rpx
      border-radius 10rpx
      position relative
      &:first-child
        margin-top 20rpx
      &.hover
        background-color #fff - 10%
      .name
        font-size 35rpx
        margin 20rpx 0
      .address
      .details
        color #666
      .def
        position absolute
        right 20rpx
        top 20rpx
        color $red
</style>
