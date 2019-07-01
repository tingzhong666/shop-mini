const router = require('koa-router')()
const { host } = require('../config')

// 普通商品列表
router.get('/shop', (ctx, next) => {
  let { limit, page } = ctx.query
  limit = limit || 10
  page = page || 1
  let data = []

  if (page * 1 < 4) {
    for (let i = 0; i < limit; i++) {
      data.push({
        // 价格
        price: 1234,
        // 商品图片
        img: host + '/img/details/banner4.png',
        title: '【低至849】华为HONOR/荣耀畅玩8C全面屏手机4G全网通手机智能手机全新手机正品学生手机官方旗舰店备用手机',
        // 标签
        tags: ['荣耀', '4G', '全面屏', '4+32G', '安卓']
      })
    }
  }

  ctx.body = {
    code: 0,
    data
  }
})

module.exports = router
