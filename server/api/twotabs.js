const router = require('koa-router')()
const { host } = require('../config')

// 商品二级分类
router.get('/twotabs', (ctx, next) => {
  const { id } = ctx.query
  let data = []

  // 手机
  if (id * 1 === 1) {
    data.push({
      img: host + '/img/tabs/huawei.png',
      label: '华为',
      id: 1
    })
    data.push({
      img: host + '/img/tabs/mi.png',
      label: '小米',
      id: 2
    })
    data.push({
      img: host + '/img/tabs/apple.png',
      label: '苹果',
      id: 3
    })
    // 电脑
  } else if (id * 1 === 2) {
    data.push({
      img: host + '/img/tabs/asus.png',
      label: '华硕',
      id: 4
    })
  }

  ctx.body = {
    code: 0,
    data
  }
})

module.exports = router
