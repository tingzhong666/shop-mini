<template>
  <div class="info">
    <image
      v-for="item in list"
      :key="item"
      :src="item"
      mode="widthFix"
      class="img"/>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
.info
  .img
    width 100%
</style>
