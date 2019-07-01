<script>
import { mapActions } from 'vuex'

export default {
  onLaunch () {
    this.init()
  },
  methods: {
    ...mapActions(['init'])
  }
}
</script>

<style lang="stylus">
page
  background-color $bgc
  font-size 30rpx
</style>
