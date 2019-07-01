const router = require('koa-router')()
const { host } = require('../config')

// 商品详情
router.get('/details', (ctx, next) => {
  let { id } = ctx.query
  id = id * 1
  switch (id) {
    // 拼团
    case 1:
      group(ctx)
      break
      // 秒杀
    case 2:
      seckill(ctx)
      break
      // 普通商品
    case 3:
      details(ctx, id)
      break
  }
})

// 拼团
function group (ctx) {
  ctx.body = {
    code: 0,
    data: {
      // 运费
      freight: 20,
      // 单买价
      origin: 1234,
      // 拼团价
      price: 849,
      // 商品图片 轮播图
      img: [
        host + '/img/details/banner0.jpg',
        host + '/img/details/banner1.jpg',
        host + '/img/details/banner2.jpg',
        host + '/img/details/banner3.jpg',
        host + '/img/details/banner4.png'
      ],
      title: '【低至849】华为HONOR/荣耀畅玩8C全面屏手机4G全网通手机智能手机全新手机正品学生手机官方旗舰店备用手机',
      // 几人团
      n: 2,
      // 标签
      tags: ['荣耀', '4G', '全面屏', '4+32G'],
      // 详情 > 一组图片
      details: [
        host + '/img/details/0.jpg',
        host + '/img/details/1.jpg'
      ],
      // 参数
      params: [
        {
          label: '分类',
          text: '手机'
        },
        {
          label: '品牌',
          text: '荣耀'
        },
        {
          label: '机型',
          text: '荣耀8c'
        },
        {
          label: '商品编码',
          text: '666666'
        },
        {
          label: '内存',
          text: '128G'
        },
        {
          label: '版本',
          text: '大陆国行'
        },
        {
          label: '颜色',
          text: '魅海蓝'
        },
        {
          label: '网络类型',
          text: '全网通'
        },
        {
          label: '内存',
          text: '8G'
        }
      ],
      // 服务
      server: [
        {
          label: '假一赔十',
          text: '每件商品保证全原装二手。杜绝一切假货。'
        },
        {
          label: '7天无忧退货&180天质保',
          text: '本商品支持7天无理由退货、180天质保服务，人为因素除外。'
        },
        {
          label: '首单送延保',
          text: '新用户购买手机首单，质保时间延长至365天。'
        },
        {
          label: '顺丰包邮',
          text: '手机、平板、笔记本等贵重商品顺丰包邮。'
        },
        {
          label: '赠运费险',
          text: '无理由退换货产生的运费，商城将以等额红包形式发放至用户账户。'
        }
      ],
      // 规格
      spec: [
        {
          label: '白色4+64G',
          price: 849,
          origin: 1234
        },
        {
          label: '白色4+128G',
          price: 999,
          origin: 1399
        },
        {
          label: '黑色4+64G',
          price: 849,
          origin: 1234
        }
      ]
    }
  }
}

// 秒杀
function seckill (ctx) {
  ctx.body = {
    code: 0,
    data: {
      // 运费
      freight: 20,
      // 倒计时
      time: 43200,
      // 原价
      origin: 1234,
      // 秒杀价
      price: 849,
      // 商品图片 轮播图
      img: [
        host + '/img/details/banner0.jpg',
        host + '/img/details/banner1.jpg',
        host + '/img/details/banner2.jpg',
        host + '/img/details/banner3.jpg',
        host + '/img/details/banner4.png'
      ],
      title: '【低至849】华为HONOR/荣耀畅玩8C全面屏手机4G全网通手机智能手机全新手机正品学生手机官方旗舰店备用手机',
      // 剩余
      surplus: [0, 8][Math.floor(Math.random() * 2)],
      // 总共
      all: 10,
      // 标签
      tags: ['荣耀', '4G', '全面屏', '4+32G'],
      // 详情 > 一组图片
      details: [
        host + '/img/details/0.jpg',
        host + '/img/details/1.jpg'
      ],
      // 参数
      params: [
        {
          label: '分类',
          text: '手机'
        },
        {
          label: '品牌',
          text: '荣耀'
        },
        {
          label: '机型',
          text: '荣耀8c'
        },
        {
          label: '商品编码',
          text: '666666'
        },
        {
          label: '内存',
          text: '128G'
        },
        {
          label: '版本',
          text: '大陆国行'
        },
        {
          label: '颜色',
          text: '魅海蓝'
        },
        {
          label: '网络类型',
          text: '全网通'
        },
        {
          label: '内存',
          text: '8G'
        }
      ],
      // 规格
      spec: [
        {
          label: '白色4+64G',
          price: 849,
          origin: 1234
        },
        {
          label: '白色4+128G',
          price: 999,
          origin: 1399
        },
        {
          label: '黑色4+64G',
          price: 849,
          origin: 1234
        }
      ]
    }
  }
}

// 普通
function details (ctx, id) {
  ctx.body = {
    code: 0,
    data: {
      id,
      // 剩余
      surplus: 10,
      // 运费
      freight: 20,
      // 秒杀价
      price: 1234,
      // 商品图片 轮播图
      img: [
        host + '/img/details/banner0.jpg',
        host + '/img/details/banner1.jpg',
        host + '/img/details/banner2.jpg',
        host + '/img/details/banner3.jpg',
        host + '/img/details/banner4.png'
      ],
      title: '【低至849】华为HONOR/荣耀畅玩8C全面屏手机4G全网通手机智能手机全新手机正品学生手机官方旗舰店备用手机',
      // 标签
      tags: ['荣耀', '4G', '全面屏', '4+32G'],
      // 详情 > 一组图片
      details: [
        host + '/img/details/0.jpg',
        host + '/img/details/1.jpg'
      ],
      // 参数
      params: [
        {
          label: '分类',
          text: '手机'
        },
        {
          label: '品牌',
          text: '荣耀'
        },
        {
          label: '机型',
          text: '荣耀8c'
        },
        {
          label: '商品编码',
          text: '666666'
        },
        {
          label: '内存',
          text: '128G'
        },
        {
          label: '版本',
          text: '大陆国行'
        },
        {
          label: '颜色',
          text: '魅海蓝'
        },
        {
          label: '网络类型',
          text: '全网通'
        },
        {
          label: '内存',
          text: '8G'
        }
      ],
      // 规格
      spec: [
        {
          label: '白色4+64G',
          price: 1234,
          id: 33333
        },
        {
          label: '白色4+128G',
          price: 1499,
          id: 33334
        },
        {
          label: '黑色4+64G',
          price: 1234,
          id: 33345
        }
      ]
    }
  }
}

module.exports = router
