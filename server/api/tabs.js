const router = require('koa-router')()
const { host } = require('../config')

// 商品分类
router.get('/tabs', (ctx, next) => {
  const { type } = ctx.query
  let data = []

  // 首页 4 个分类
  if (type === 'index') {
    data = [
      {
        id: 0,
        img: host + '/img/tabs/tabs0.png',
        label: '平板'
      },
      {
        id: 1,
        img: host + '/img/tabs/tabs1.png',
        label: '手机'
      },
      {
        id: 2,
        img: host + '/img/tabs/tabs2.png',
        label: '电脑'
      },
      {
        id: 3,
        img: host + '/img/tabs/tabs3.png',
        label: '配件'
      }
    ]
  } else {
    data = [
      {
        id: 0,
        img: host + '/img/tabs/tabs0.png',
        label: '平板'
      },
      {
        id: 1,
        img: host + '/img/tabs/tabs1.png',
        label: '手机'
      },
      {
        id: 2,
        img: host + '/img/tabs/tabs2.png',
        label: '电脑'
      },
      {
        id: 3,
        img: host + '/img/tabs/tabs3.png',
        label: '配件'
      },
      {
        id: 4,
        label: '无人机'
      },
      {
        id: 5,
        label: '手表'
      },
      {
        id: 6,
        label: '智能家居'
      }
    ]
  }

  ctx.body = {
    code: 0,
    data
  }
})

module.exports = router
