const Koa = require('koa')
const app = new Koa()
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const path = require('path')

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 静态资源
app.use(koaStatic(path.join(__dirname, '/public')))

// 引入路由分发
app.use(require('./api').routes())

// 启动程序，监听端口
app.listen(5757, () => console.log('listening on port 5757'))
