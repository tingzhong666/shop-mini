const router = require('koa-router')()
const { host } = require('../config')

// 拼团列表
router.get('/group', (ctx, next) => {
  let { limit, page } = ctx.query
  limit = limit || 10
  page = page || 1
  let data = []

  if (page * 1 < 4) {
    for (let i = 0; i < limit; i++) {
      data.push({
        // 单买价
        origin: 1234,
        // 拼团价
        price: 849,
        // 商品图片
        img: host + '/img/details/banner4.png',
        title: '【低至849】华为HONOR/荣耀畅玩8C全面屏手机4G全网通手机智能手机全新手机正品学生手机官方旗舰店备用手机',
        // 几人团
        n: 2,
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
