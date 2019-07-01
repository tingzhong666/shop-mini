<template>
  <div class="mask">
    <div class="container" @click="click" :class="{ maskShow: maskShow }">
      <!-- 服务 / 参数 -->
      <div
        @click.stop=""
        :class="{
          showClass: show2 === 2 || show2 === 3,
          server: show2 === 2,
          params: show2 === 3
        }">
        <div class="title">{{show2 === 2 ? '服务' : '参数'}}</div>

        <div class="content">
          <div class="li" v-for="item in arr" :key="item">
            <div class="label">{{item.label}}</div>

            <div class="text">{{item.text}}</div>
          </div>
        </div>
      </div>

      <!-- 规格 -->
      <div
        @click.stop=""
        class="spec"
        :class="{
          showClass: show2 === 1
        }">
        <!-- 头部 -->
        <div class="head" v-if="show2 === 1">
          <!-- 图片 -->
          <image class="img" :src="banner[4]" mode="widthFix"></image>

          <div class="right">
            <div class="price">￥{{spec[specActive].price}}</div>
            <div class="active">{{spec[specActive].label}}</div>
          </div>
        </div>

        <!-- 规格 -->
        <div class="title">选择</div>
        <div class="content">
          <div
            @click="change(index)"
            class="li"
            v-for="(item, index) in spec"
            :key="item.label"
            :class="{ active: specActive === index }">{{item.label}}</div>
        </div>

        <!-- 确定 即关闭 -->
        <div @click="click" class="btn" v-if="show2 === 1">
          <text class="text">确定</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 遮罩显示
      maskShow: false,
      // 板块显示
      show2: this.show
    }
  },
  props: {
    server: {
      type: Array,
      default: () => []
    },
    params: {
      type: Array,
      default: () => []
    },
    // 显示
    show: {
      type: Number,
      default: 0 // 0 不显示 1 选择 2 服务 3 参数
    },
    // 规格种类
    spec: {
      type: Array,
      default: () => []
    },
    // 轮播图
    banner: {
      type: Array,
      default: () => []
    },
    // 规格选择
    specActive: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 判断渲染模块
    arr () {
      if (this.show2 === 2) {
        return this.server
      }
      return this.params
    }
  },
  watch: {
    show (newV, oldV) {
      if (oldV === 0) {
        if (newV === 1 || newV === 2 || newV === 3) {
          this.maskShow = true
          setTimeout(() => {
            this.show2 = newV
          }, 50)
        }
      }

      if (oldV === 1 || oldV === 2 || oldV === 3) {
        if (newV === 0) {
          this.show2 = newV
          setTimeout(() => {
            this.maskShow = false
          }, 300)
        }
      }
    }
  },
  methods: {
    // 遮罩点击
    click () {
      this.$emit('cancel')
    },
    // 选择不同
    change (index) {
      if (index === this.specActive) return

      this.$emit('change', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  z-index 1000
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color #00000050
  display none
  > div
    background-color #fff
    position absolute
    bottom 0
    left 0
    height 0
    width 100%
    transition height .3s
  // 遮罩显示
  &.maskShow
    display block
  // 板块显示
  .showClass
    height 800rpx
  // 共用
  .server
  .params
    .title
      padding 20rpx 0
      text-align center
      border-bottom 2rpx solid #eee
    .content
      padding 20rpx
  // 服务板块
  .server
    .content
      .li
        margin-bottom 20rpx
        .label
          margin-bottom 10rpx
  // 参数板块
  .params
    .content
      .li
        margin-bottom 20rpx
        > div
          display inline-block
        .label
          width 200rpx
  // 规格选择
  .spec
    padding 20rpx
    .head
      .img
        width 20%
      .right
        display inline-block
        .price
          color $red - 10%
          font-weight 900
          font-style italic
          font-size 35rpx
    .title
      margin 20rpx 0
      font-size 35rpx
    .content
      .li
        display inline-block
        background-color $bgc
        border-radius 3rpx
        margin-right 20rpx
        padding 15rpx 30rpx
        &.active
          background-color $red + 90%
          color $red
    // 确定
    .btn
      background-color $red - 10%
      padding 30rpx 0
      color #fff
      font-size 35rpx
      position absolute
      bottom 0
      left 0
      width 100%
      text-align center
      .text
        position relative
        left -30rpx
</style>
