<template>
  <div class="search">
    <navigator class="input" url="/pages/search/main" hover-class="none">
      <icon type="search" class="icon" size="40rpx"></icon>
      <div class="placeholder">苹果X</div>
    </navigator>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.search
  width 100%
  .input
    width 670rpx
    background-color #fff
    margin 0 auto
    display flex
    padding 15rpx
    height 40rpx
    align-items center
    .placeholder
      font-size 33rpx
      color #999
      margin-left 15rpx
</style>
