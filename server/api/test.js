const router = require('koa-router')()

router.get('/test', (ctx, next) => {
  ctx.body = {
    test: 'test',
    code: 0
  }
})

module.exports = router
