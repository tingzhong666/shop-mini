const router = require('koa-router')()
const { host } = require('../config')

// 评价
router.get('/comments', (ctx, next) => {
  let { id, page, limit } = ctx.query
  page = page || 1
  limit = limit || 10
  let list = []

  if (page * 1 < 4) {
    for (let i = 0; i < 10; i++) {
      list.push({
        // 星星评级 5 星为好评
        stars: i < 9 ? 5 : 4,
        username: ['匿名用户', '用户' + i][Math.floor(Math.random() * 2)],
        img: '/static/tabs/my.png',
        created_time: 1560661886193,
        content: '一切都很好。性价比确实可以。只是配件就呵呵了。',
        // 配图
        imgs: [
          host + '/img/details/peitu0.jpg',
          host + '/img/details/peitu1.jpg'
        ]
      })
    }
  }

  ctx.body = {
    code: 0,
    data: {
      id,
      list,
      // 总共
      n: 30,
      // 好评率
      good: 0.9
    }
  }
})

module.exports = router
