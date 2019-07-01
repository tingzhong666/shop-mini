const router = require('koa-router')()

// 地址列表
router.get('/addresslist', (ctx, next) => {
  let code = 0
  let data = []

  data.push({
    name: '听众',
    phone: 15972587100,
    address: ['四川省', '成都市', '锦江区'],
    details: '某某小区',
    default: true,
    id: 1
  })
  data.push({
    name: '听众2',
    phone: 15972587101,
    address: ['四川省', '成都市', '锦江区'],
    details: '某某小区',
    default: false,
    id: 2
  })

  ctx.body = {
    code,
    data
  }
})

module.exports = router
