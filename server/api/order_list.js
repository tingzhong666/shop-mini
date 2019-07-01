const router = require('koa-router')()
const { host } = require('../config')

// 订单列表
router.get('/orderlist', (ctx, next) => {
  // 0 全都 1 代付款 2 待发货 3 待收货
  // const mode = ctx.query.mode * 1

  let data = []
  data.push({
    // 订单号
    id: 987596565876,
    // 商品列表图片
    shop: [host + '/img/details/banner4.png'],
    // 合计
    price: 1234,
    // 订单创建时间
    created_time: 1561185187830
  })

  ctx.body = {
    code: 0,
    data
  }
})

module.exports = router
