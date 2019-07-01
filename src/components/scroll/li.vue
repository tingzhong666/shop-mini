<template>
  <div class="li" @click="click">
    <!-- 商品封面 -->
    <image class="img" :src="item.img" mode="aspectFit"></image>

    <div class="right">
      <!-- 标题 -->
      <div class="title">{{item.title}}</div>

      <!-- 拼团标签 -->
      <div class="tags-group" v-if="mode === 'group'">{{groupTags}}</div>
      <!-- 秒杀标签 -->
      <div class="tags-seckill" v-if="mode !== 'group'">
        <div class="tag" v-for="label in tags" :key="label">
          <Tag :label="label"/>
        </div>
      </div>

      <div class="bottom">
        <!-- 左边价格 -->
        <div class="left">
          <!-- 团 / 秒杀 价 -->
          <div class="after">
            <!-- 图标团 -->
            <image mode="aspectFit" class="group" src="/static/img/group.png" v-if="mode === 'group'"></image>
            <!-- 图标秒杀 -->
            <image mode="aspectFit" class="seckill" src="/static/img/seckill.png" v-if="mode === 'seckill'"></image>

            <!-- 价格 -->
            <div class="price">￥{{item.price}}</div>
          </div>

          <!-- 单买价 / 原价 -->
          <div class="origin" v-if="mode === 'seckill' || mode === 'group'">
            <text class="title">{{mode === 'seckill' ? '原价' : '单买价'}}</text>
            <text class="i">￥{{item.origin}}</text>
          </div>
        </div>

        <!-- 右边秒杀按钮 -->
        <div class="seckill" v-if="mode === 'seckill'">
          <!-- 剩余多少件 -->
          <div class="surplus">
            仅剩{{item.surplus}}台
            <progress
              class="progress"
              border-radius="50"
              :percent="item.surplus / item.all * 100"
              activeColor="#ff0036"/>
          </div>

          <div
            class="btn"
            :style="{
              backgroundColor: item.surplus === 0 ? '#999' : ''
            }">
            {{item.surplus === 0 ? '已售完' : '去秒杀'}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/tag'

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    mode: {
      type: String,
      default: 'seckill' // seckill group search tab
    }
  },
  computed: {
    // 拼团标签
    groupTags () {
      return this.item.tags.join(',')
    },
    // 秒杀标签
    tags () {
      if (this.mode === 'seckill') {
        return this.item.tags.slice(0, 3)
      }
      return this.item.tags
    }
  },
  components: {
    Tag
  },
  methods: {
    // 点击商品
    click () {
      this.$emit('click', this.item.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.li
  display flex
  background-color #fff
  margin-bottom 20rpx
  padding 10rpx 20rpx
  .img
    width 30%
    height 200rpx
  .right
    width 70%
    .title
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
    // 秒杀标签
    .tags-seckill
      .tag
        margin-right 20rpx
        display inline-block
    // 拼团标签
    .tags-group
      color #999
      font-size 25rpx
      margin-top 10rpx
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .bottom
      display flex
      margin-top 10rpx
      justify-content space-between
      .left
        // 秒杀 / 团 价
        .after
          div
            display inline-block
          // 秒杀图标
          .seckill
            width 56rpx
            height 32rpx
            margin-right 10rpx
          // 拼团 图标
          .group
            width 32rpx
            height 32rpx
            margin-right 10rpx
          .price
            font-weight 900
            color $red - 20%
            font-style italic
            position relative
            bottom 5rpx
        // 原价
        .origin
          margin-top 10rpx
          color #666
          font-size 25rpx
          .i
            text-decoration-line line-through
      // 秒杀按钮
      .seckill
        .surplus
          color $red - 10%
          font-size 20rpx
          display flex
          justify-content space-between
          .progress
            width 100rpx
        .btn
          color #fff
          background-color $red - 10%
          margin-top 10rpx
          font-size 30rpx
          padding 8rpx 50rpx
</style>
