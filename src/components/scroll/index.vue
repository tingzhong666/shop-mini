<template>
  <!-- =============== 拼团 秒杀 搜索 某分类下 页面滚动商品列表 ================ -->
  <scroll-view
    @scrolltolower="down"
    scroll-y
    :style="{ height: height + 'px' }"
    class="scroll"
    :scroll-into-view="top ? 'top' : ''">
    <div id="top"></div>
    <div
      v-for="(item, index) in list"
      :key="index">
      <Liq :item="item" :mode="mode" @click="click"/>
    </div>

    <div class="more">
      {{more}}
    </div>
  </scroll-view>
</template>

<script>
import Liq from './li'

export default {
  props: {
    // 滚动组件高度
    height: {
      type: Number,
      default: 0
    },
    // 渲染数据
    list: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: 'seckill' // seckill group search tab
    },
    // 底部提示文字
    more: {
      type: String,
      default: ''
    },
    top: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Liq
  },
  methods: {
    // 触底事件
    down () {
      this.$emit('down')
    },
    // 点击商品
    click (id) {
      this.$emit('click', id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll
  .li
    margin-bottom 20rpx
  .more
    text-align center
    color #666
</style>
