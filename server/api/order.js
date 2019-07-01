const router = require('koa-router')()
const { host } = require('../config')

// 订单详情
router.get('/order', (ctx, next) => {
  const id = ctx.query.id

  ctx.body = {
    code: 0,
    data: {
      // 订单编号 ID
      id,
      // 商品列表
      shop: [
        {
          // 标题
          title: '【低至849】华为HONOR/荣耀畅玩8C全面屏手机4G全网通手机智能手机全新手机正品学生手机官方旗舰店备用手机',
          // 规格
          spec: '白色4+64G',
          // 商品图片
          img: host + '/img/details/banner4.png',
          // 单价
          price: 1234,
          // 数量
          n: 1
        }
      ],
      // 商品总价
      all: 1234,
      // 运费总价
      freight: 20,
      // 总共
      total: 1254,
      // 商品状态
      mode: 1 // 待支付
    }
  }
})

module.exports = router
