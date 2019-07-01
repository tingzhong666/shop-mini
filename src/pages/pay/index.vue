<template>
  <div class="pay">
    <div class="address">
      <Addressq/>
    </div>

    <div class="shop">
      <Shop :info="info" :specIndex="specIndex" :mode="mode" :alone="alone"/>
    </div>

    <div class="cost">
      <Cost :info="info" :specIndex="specIndex" :remarks="remarks" @change="change"/>
    </div>

    <div class="btn">
      <Btn :remarks="remarks" :info="info" :specIndex="specIndex"/>
    </div>
  </div>
</template>

<script>
import Addressq from '@/components/address'
import Shop from './shop'
import Cost from './cost'
import Btn from './btn'
import { details } from '@/api'

export default {
  components: { Addressq, Shop, Cost, Btn },
  data () {
    return {
      info: {},
      id: 0,
      // 规格选择索引
      specIndex: 0,
      remarks: '',
      mode: '',
      alone: 0
    }
  },
  methods: {
    async get () {
      const res = await details({ id: this.id })
      if (res.code === 0) {
        this.info = res.data
      }
    },
    // 备注
    change (v) {
      this.remarks = v
    }
  },
  onLoad () {
    const { mode, id, spec, alone } = this.$root.$mp.query
    this.mode = mode
    this.id = id
    this.specIndex = spec
    this.alone = alone * 1
    this.get()
  },
  onUnload () {
    this.info = {}
  }
}
</script>

<style lang="stylus" scoped>
.pay
  .shop
  .cost
    margin-top 20rpx

</style>
