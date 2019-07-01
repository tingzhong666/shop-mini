<template>
  <div class="conf">
    <div class="container">
      <!-- 选择 -->
      <div class="select" @click="show = 1">
        <div class="label">已选</div>
        <div class="text">{{specSelect}}</div>
        <div class="iconfont icon-zuojiankuohao"></div>
      </div>

      <!-- 服务 -->
      <div class="server" @click="show = 2">
        <div class="label">服务</div>
        <div class="text">假一赔十/七天退货/顺丰包邮</div>
        <div class="iconfont icon-zuojiankuohao"></div>
      </div>

      <!-- 参数 -->
      <div class="params" @click="show = 3">
        <div class="label">参数</div>
        <div class="text">{{paramsIntro}}</div>
        <div class="iconfont icon-zuojiankuohao"></div>
      </div>
    </div>

    <!-- 遮罩 弹出信息 -->
    <div class="mask">
      <Mask
        @change="change"
        @cancel="cancel"
        v-bind="{ server, params, spec, show, banner, specActive }"/>
    </div>
  </div>
</template>

<script>
import Mask from './mask'

export default {
  components: { Mask },
  data () {
    return {
      // 服务
      server: [
        {
          label: '假一赔十',
          text: '每件商品保证全原装二手。杜绝一切假货。'
        },
        {
          label: '7天无忧退货&180天质保',
          text: '本商品支持7天无理由退货、180天质保服务，人为因素除外。'
        },
        {
          label: '首单送延保',
          text: '新用户购买手机首单，质保时间延长至365天。'
        },
        {
          label: '顺丰包邮',
          text: '手机、平板、笔记本等贵重商品顺丰包邮。'
        },
        {
          label: '赠运费险',
          text: '无理由退换货产生的运费，商城将以等额红包形式发放至用户账户。'
        }
      ],
      // 遮罩显示 0 不显示 1 选择 2 服务 3 参数
      show: 0,
      // 规格选择
      specActive: 0
    }
  },
  props: {
    params: {
      type: Array,
      default: () => []
    },
    // 规格
    spec: {
      type: Array,
      default: () => []
    },
    banner: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // 参数前 4 项
    paramsIntro () {
      let arr = []
      this.params.forEach((item, index) => {
        if (index >= 4) return

        arr.push(item.text)
      })

      return arr.join(',')
    },
    // 选择的规格
    specSelect () {
      return this.spec.length ? this.spec[this.specActive].label : ''
    }
  },
  methods: {
    // 点击遮罩 取消显示
    cancel () {
      this.show = 0
    },
    // 规格选择变化
    change (index) {
      this.specActive = index
      this.$emit('specChange', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.conf
  .container > div
    display flex
    justify-content space-between
    padding 20rpx 0
</style>
