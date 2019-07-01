const router = require('koa-router')()

// 搜索热词
router.get('/hotkey', (ctx, next) => {
  ctx.body = {
    code: 0,
    data: ['华为1', '华为2', '华为3', '华为4', '华为5', '华为6', '华为7', '华为8']
  }
})

module.exports = router
