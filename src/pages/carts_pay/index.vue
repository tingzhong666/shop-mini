<template>
  <div class="index">
    <payList
      v-bind="{
        list,
        allPrice,
        allFreight,
        payPrice,
        mode: 'cartsPay'
      }"
      @input="input"
      @pay="pay"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import payList from '@/components/pay_list/index'

export default {
  data () {
    return {
      remarks: ''
    }
  },
  components: { payList },
  computed: {
    ...mapState(['cartsPay']),
    // 对数据进行筛选
    list () {
      return this.cartsPay.map(item => {
        const spec = item.info.spec.find(v => v.id === item.specId)
        return {
          // 图片
          img: item.info.img[4],
          // 标题
          title: item.info.title,
          // 数量
          n: item.n,
          // 规格名称
          spec: spec.label,
          // 单价
          price: spec.price,
          // 运费
          freight: item.info.freight
        }
      })
    },
    // 总价
    allPrice () {
      let price = 0
      this.list.forEach(item => {
        price += item.price * item.n
      })
      return price
    },
    // 总运费
    allFreight () {
      let freight = 0
      this.list.forEach(item => {
        freight += item.freight
      })
      return freight
    },
    // 实际支付
    payPrice () {
      return this.allFreight + this.allPrice
    }
  },
  methods: {
    // 备注
    input (v) {
      this.remarks = v
    },
    // 支付
    pay () {
      wx.showToast({ title: '没有接口', icon: 'none' })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
