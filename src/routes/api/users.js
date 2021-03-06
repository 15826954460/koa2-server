/**
 * @author 柏运送
 * @date 2021-03-06 22:15:49
 * @description 用户
*/

const router = require('koa-router')();
router.prefix('/api/user');

const {
  createUser,
  deleteUser,
  updateUserInfo,
  getUserInfo
} = require('../../db/controller/users');

router.post('/create', async (ctx, next) => {
  const body = ctx.request.body;
  ctx.body = await createUser(body);
});

router.get('/getUserInfo', async (ctx, next) => {
  const query = ctx.request.query;
  ctx.body = await getUserInfo(query);
})

router.post('/login', async (ctx, next) => {
  const body = ctx.request.body;
  const { code, data: { password, ...userInfo } } = await getUserInfo(body, true);
  const { username } = userInfo;
  if (code === 0 && username && password && !ctx.session.userInfo) {
    ctx.session.userInfo = userInfo;
  }
  console.log(ctx.session);
  ctx.body = ctx.session.userInfo;
})

module.exports = router;