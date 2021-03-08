/**
 * @author 柏运送
 * @date 2021-03-06 18:48:36
 * @description 路由以及基本功能测试
*/

const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const util = require('util');
const verity = util.promisify(jwt.verify);
router.prefix('/');

const { JWT_SECRET_KEY } = require('../constants/keys');
const { loginCheck } = require('../middleware/login-check');

// 页面路由 inspect debugger 测试
router.get('/', async (ctx, next) => {
  console.log('debug before');
  // debugger;
  // console.log('debugger after');
  // 渲染首页
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/error', async (ctx, next) => {
  await ctx.render('error', {
    message: 'error message',
    error: {
      status: 'error status',
      stack: 'stack'
    }
  });
});

// jwt 解密
router.get('/jwt', async (ctx, next) => {
  const token = ctx.header.authorization;
  console.log(token);
  const payload = await verity(token.split(' ')[1], JWT_SECRET_KEY)
  ctx.body = {
    userInfo: payload
  }
})

// 模拟登录, 服务端生成 jwt 加密
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  let userInfo;
  if (username === 'zhangsan' && password === 'abc') {
    userInfo = {
      username,
      password,
      nickName: 'test_bys'
    }
    const token = await jwt.sign(userInfo, JWT_SECRET_KEY, { 
      expiresIn: 60 * 60 
    });

    ctx.body = {
      code: 1,
      message: 'success',
      data: token
    }
  } else {
    ctx.body = {
      code: -1,
      message: 'error',
      data: {}
    }
  }
})

// session test
router.get('/session', async (ctx, next) => {
  let session = ctx.session;
  session.count = session.count || 0;
  session.count++;
  ctx.body = {
    session_count: session.count
  }
})

// router 错误捕获结合 app.js koa-onerror
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = { title: 'koa2 json' };
})

router.get('/login', async (ctx, next) => {
  const userInfo = ctx.session && ctx.session.userInfo;
  if (!userInfo) {
    ctx.session.userInfo = { username: 'test_001', gender: "nan" }
  }
  ctx.body = {
    code: 0,
    msg: "登录成功",
    // data: ctx.session.userInfo
  }
})

module.exports = router;
