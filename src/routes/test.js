const router = require('koa-router')()

// 页面路由
router.get('/', async (ctx, next) => {
  console.log('debug before');
  // debugger;
  // console.log('debugger after');
  // 渲染首页
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  throw new Error();
  // ctx.body = 'koa2 string'
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

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

router.get('/session', async (ctx, next) => {
  let session = ctx.session;
  session.count = session.count || 0;
  session.count++;
  ctx.body = {
    session_count: session.count
  }
})

module.exports = router
