<template>
  <div class="li">
    <!-- 选择 -->
    <div class="select">
      <checkboxq :checked="isSelect" @change="selectChange"/>
    </div>

    <!-- 图片 -->
    <div class="img">
      <image class="img" :src="item.info.img[4]" mode="widthFix" @click="toDetails"></image>
    </div>

    <!-- 介绍 -->
    <div class="info">
      <!-- 标题 -->
      <div class="title">{{item.info.title}}</div>

      <!-- 规格 -->
      <div class="spec">{{spec}}</div>

      <!-- 价钱 数量 -->
      <div class="bottom">
        <!-- 价钱 -->
        <div class="price">￥{{price}}</div>

        <!-- 数量框 -->
        <div class="n">
          <nInput :init="item.n" :min="1" :max="item.info.surplus" @change="nChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkboxq from './checkbox'
import nInput from './number_input'
import { mapActions } from 'vuex'

export default {
  components: { checkboxq, nInput },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    selects: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // 是否被选中
    isSelect () {
      return !!this.selects.find(item => item === this.item.specId)
    },
    // 规格
    spec () {
      if (!Object.keys(this.item).length) return ''

      return this.item.info.spec.find(item => item.id === this.item.specId).label
    },
    price () {
      if (!Object.keys(this.item).length) return ''

      return this.item.info.spec.find(item => item.id === this.item.specId).price
    }
  },
  methods: {
    ...mapActions(['modifyCarts']),
    selectChange () {
      this.$emit('selectChange', this.item.specId)
    },
    // 数量变化
    nChange (n) {
      this.modifyCarts({ specId: this.item.specId, n })
    },
    // 去往详情页
    toDetails () {
      wx.navigateTo({ url: '/pages/details/main?type=shop&id' + this.item.info.id })
    }
  }
}
</script>

<style lang="stylus" scoped>
.li
  display flex
  background-color #fff
  border-bottom 1rpx solid #eee
  box-sizing border-box
  padding 20rpx
  .select
    width 7%
    display flex
    align-items center
    justify-content center
  > .img
    width 18%
    .img
      width 100%
  .info
    width 75%
    .title
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      margin-bottom 10rpx
    .spec
      font-size 25rpx
      margin-bottom 10rpx
    .bottom
      display flex
      justify-content space-between
      .price
        color $red - 15%
</style>
