const router = require('koa-router')()
const { host } = require('../config')

// 秒杀商品列表
router.get('/seckill', (ctx, next) => {
  let { limit, page } = ctx.query
  limit = limit || 10
  page = page || 1
  let list = []

  if (page * 1 < 4) {
    for (let i = 0; i < limit; i++) {
      list.push({
        // 原价
        origin: 1234,
        // 秒杀价
        price: 849,
        // 商品图片
        img: host + '/img/details/banner4.png',
        title: '荣耀畅玩8C全面屏手机4G全网通手机智能手机全新手机正品学生手机官方旗舰店备用手机',
        // 剩余
        surplus: i === 0 ? 0 : 8,
        // 总共
        all: 10,
        // 标签
        tags: ['荣耀', '4G', '全面屏', '4+32G'],
        id: 666
      })
    }
  }

  ctx.body = {
    code: 0,
    data: {
      list,
      // 秒杀结束时间 单位 秒
      timed: 43200,
      // 即将开放
      soon: 86400
    }
  }
})

module.exports = router
