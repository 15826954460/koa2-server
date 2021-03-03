const router = require('koa-router')();


router.prefix('/users')

router.get('/', async () => {
  ctx.body = 'login test router'
})

// 模拟登录
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  let userInfo;
  if (username === 'zhangsan' && password === 'abc') {
    userInfo = {
      username,
      password,
      nickName: 'test_bys'
    }
    const token = await jwt.sign(userInfo, JWT_SECRET_KEY, { expiresIn: 60 * 60 });

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

module.exports = router
