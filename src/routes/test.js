const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

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
