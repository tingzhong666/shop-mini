const router = require('koa-router')()
const axios = require('axios')
const { appid, appSecret } = require('../config')

router.get('/login', async (ctx, next) => {
  const { code } = ctx.query
  let data = {}

  if (!code) {
    ctx.body = {
      code: -1,
      msg: '登录code为false',
      data
    }
    return
  }

  const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid,
      secret: appSecret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  })

  data = {
    openid: res.data.openid
  }

  ctx.body = {
    code: 0,
    data,
    msg: '登录成功'
  }
})

module.exports = router
