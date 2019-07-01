const router = require('koa-router')()
const { host } = require('../config')

// 轮播图
router.get('/banner', (ctx, next) => {
  ctx.body = {
    code: 0,
    data: [
      {
        img: host + '/img/banner0.jpg',
        id: 0
      },
      {
        img: host + '/img/banner1.jpg',
        id: 1
      },
      {
        img: host + '/img/banner2.jpg',
        id: 2
      },
      {
        img: host + '/img/banner3.jpg',
        id: 3
      },
      {
        img: host + '/img/banner4.jpg',
        id: 4
      },
      {
        img: host + '/img/banner5.jpg',
        id: 5
      }
    ]
  }
})

module.exports = router
