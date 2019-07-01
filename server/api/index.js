const router = require('koa-router')({
  prefix: '/weapp'
})
const fs = require('fs')

fs.readdirSync(__dirname, { withFileTypes: true }).forEach(item => {
  if (item.isFile() && item.name !== 'index.js') {
    router.use(require('./' + item.name).routes())
  }
})

module.exports = router
