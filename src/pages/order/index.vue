<template>
  <div class="index">
    <payList
      v-bind="{
        list,
        allPrice,
        allFreight,
        payPrice,
        mode: 'order',
        status
      }"/>
  </div>
</template>

<script>
import { order } from '@/api'
import payList from '@/components/pay_list/index'

export default {
  components: { payList },
  data () {
    return {
      id: '',
      info: {}
    }
  },
  computed: {
    // 商品状态
    status () {
      if (!Object.keys(this.info)) return ''

      let status = ''
      switch (this.info.mode) {
        case 1:
          status = '待付款'
          break
        case 2:
          status = '待发货'
          break
        case 3:
          status = '待收货'
          break
      }
      return status
    },
    // 商品列表
    list () {
      if (!Object.keys(this.info)) return []

      return this.info.shop
    },
    // 总共价钱
    allPrice () {
      if (!Object.keys(this.info)) return 0

      return this.info.all
    },
    // 总共运费
    allFreight () {
      if (!Object.keys(this.info)) return 0

      return this.info.freight
    },
    // 合计
    payPrice () {
      if (!Object.keys(this.info)) return 0

      return this.info.total
    }
  },
  onLoad () {
    this.id = this.$root.$mp.query.id
    this.get()
  },
  onUnload () {
    this.id = ''
    this.info = {}
  },
  methods: {
    async get () {
      const res = await order({ id: this.id })
      if (res.code === 0) {
        this.info = res.data
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
