<template>
  <div class="my">
    <!-- 头部用户板块 -->
    <div class="head">
      <Headq/>
    </div>

    <!-- 功能列表板块 -->
    <div class="function">
      <Func/>
    </div>
  </div>
</template>

<script>
import Headq from './head'
import Func from './function'

export default {
  components: { Headq, Func },
  data () {
    return {
    }
  },
  onLoad () {
  }
}
</script>

<style lang="stylus" scoped>
.my
  .function
    padding 20rpx
</style>
