const router = require('koa-router')()
const { host } = require('../config')

// 评价列表
router.get('/evaluate', (ctx, next) => {
  ctx.body = {
    code: 0,
    data: [
      {
        // 标题
        title: '【低至849】华为HONOR/荣耀畅玩8C全面屏手机4G全网通手机智能手机全新手机正品学生手机官方旗舰店备用手机',
        // 规格
        spec: '白色4+64G',
        // 商品图片
        shop_img: host + '/img/details/banner4.png',
        // 单价
        price: 1234,
        // 数量
        n: 1,
        id: 23423,
        content: '一切都很好。性价比确实可以。只是配件就呵呵了。',
        // 配图
        imgs: [
          host + '/img/details/peitu0.jpg',
          host + '/img/details/peitu1.jpg'
        ],
        created_time: 1560661886193
      }
    ]
  }
})

module.exports = router
