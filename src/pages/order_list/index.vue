<template>
  <div class="index">
    <div class="nav">
      <Navq :mode="mode" @change="change" :nav="nav"/>
    </div>

    <div class="list">
      <swiper
        @change="scroll"
        :current="mode"
        circular
        :style="{ height: height + 'px' }"
        class="swiper">
        <swiper-item v-for="item in nav" :key="item">
          <Listq :list="list" :label="item.label"/>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { orderList } from '@/api'
import Navq from './nav'
import Listq from './list'

export default {
  components: { Navq, Listq },
  data () {
    return {
      height: 0,
      // 0 全都 1 待付款 2 待发货 3 待收货
      mode: 0,
      list: [],
      nav: [
        {
          mode: 0,
          label: '全部'
        },
        {
          mode: 1,
          label: '待付款'
        },
        {
          mode: 2,
          label: '待发货'
        },
        {
          mode: 3,
          label: '待收货'
        }
      ]
    }
  },
  computed: {
    label () {
      return this.nav.find(item => item.mode === this.mode).label
    }
  },
  onLoad () {
    this.mode = this.$root.$mp.query.mode * 1
    this.get()
  },
  onUnload () {
    this.mode = 0
    this.list = []
  },
  methods: {
    async get () {
      const res = await orderList({ mode: this.mode })

      if (res.code === 0) {
        this.list = this.list.concat(res.data)
      }
    },
    // 点击变化
    change (mode) {
      this.mode = mode
      this.list = []
      this.get()
    },
    // 滑动事件
    scroll (e) {
      this.mode = e.mp.detail.current
    },
    // 得出swiper高度
    getHeight () {
      const query = wx.createSelectorQuery()
      query.select('.nav').boundingClientRect(res => {
        const navHeight = res.height
        wx.getSystemInfo({
          success: res => {
            this.height = res.windowHeight - navHeight
          }
        })
      }).exec()
    }
  },
  mounted () {
    this.getHeight()
  }
}
</script>

<style lang="stylus" scoped>

</style>
