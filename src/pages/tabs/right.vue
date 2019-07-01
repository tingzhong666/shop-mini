<template>
  <div style="background-color: #fff;">
    <scroll-view
      class="right"
      :class="{ show: show }"
      :style="{ height: height + 'px' }"
      scroll-y>
      <div class="container" v-show="list.length">
        <div
          v-for="item in list"
          :key="item.id"
          class="li"
          @click="to(item.id)">
          <image :src="item.img" class="img" mode="aspectFit"/>
          <div class="text">{{item.label}}</div>
        </div>
      </div>

      <div class="not" v-show="!list.length">
        小编太懒，还没有添加分类！
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 0
    }
  },
  watch: {
    list () {
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 30)
    }
  },
  methods: {
    to (id) {
      wx.navigateTo({ url: '/pages/list/main?mode=tab&tabid=' + id })
    }
  }
}
</script>

<style lang="stylus" scoped>
.right
  background-color #fff
  opacity 0
  .container
    padding 20rpx
    display flex
    justify-content space-between
    .li
      width 30%
      .img
        width 100%
        height 100rpx
      .text
        text-align center
  .not
    text-align center
    color #999
.show
  transition opacity .3s
  opacity 1
</style>
