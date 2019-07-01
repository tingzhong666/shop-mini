const router = require('koa-router')()

// 地址列表
router.get('/address', (ctx, next) => {
  const id = ctx.query.id * 1
  let code = 0
  let data = {}

  if (id === 1) {
    data = {
      name: '听众',
      phone: 15972587100,
      address: ['四川省', '成都市', '锦江区'],
      details: '某某小区',
      default: true,
      id: 1
    }
  }

  if (id === 2) {
    data = {
      name: '听众',
      phone: 15972587100,
      address: ['四川省', '成都市', '锦江区'],
      details: '某某小区',
      default: false,
      id: 2
    }
  }

  ctx.body = {
    code,
    data
  }
})

module.exports = router
