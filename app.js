const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const cors = require('koa2-cors');
const koaJwt = require('koa-jwt');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const { RedisConfig } = require(resolve('/src/config'));
const { isProd } = require(resolve('/src/config/env'));
const { SESSION_SECRET_KEY, JWT_SECRET_KEY } = require(resolve('/src/config/keys'));

/**
 * @description 路由
*/
const { test, users } = require(resolve('/src/routes'));

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

/**
 * 定义允许跨域的 origin
 */
const allowOrigins = [
  'http://localhost:9090',
];
app.use(cors({
  origin: function(ctx) {
    return ctx.header.roigin;
    // if (allowOrigins.includes(ctx.header.origin)) {
    //   return ctx.header.origin;
    // }
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DEL'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept',],
  exposeHeaders: ['token'],
}));

// jwt 验证
app.use(koaJwt({ 
  secret: JWT_SECRET_KEY
}).unless({
  path: [/^\/users\/login/, /^\/test\/login/]
})); // unless 排除路由的 验证的路由

/**
 * session 配置 有使用才会生效
 */
const EXPIRSES_TIME = 24 * 60 * 60 * 1000;
app.keys = [SESSION_SECRET_KEY]; // 签名的cookie的密钥数组
app.use(session({
  key: 'weibo.sid', // cookie name 默认是: koa.sid
  prefix: 'weibo:sess:', // redis key 默认前缀 默认是 koa:sess: 
  cookie: {
    path: '/',                      // 定义访问路径 / => 表示所有的的都可以访问
    httpOnly: true,                 // 定义只允许服务端修改
    maxAge: EXPIRSES_TIME,          // cookie 过期时间 单位 ms,
    overwrite: true,
    signed: true
  },
  ttl: EXPIRSES_TIME, // redis 过期时间,默认和cookie保持一致
  store: redisStore({
    all: `${RedisConfig.host}:${RedisConfig.port}`
  })
}));

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/src/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(test.routes(), test.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.log(err);
  console.error('server error', err, ctx)
});

module.exports = app
