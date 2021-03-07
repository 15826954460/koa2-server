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

/** 创建 */
router.post('/create', async (ctx, next) => {
  const { 
    request: { body }
  } = ctx;
  ctx.body = await createUser(body);
});

/**
 * @description 获取用户信息
 * @param { userId, username, password } 
*/
router.get('/getUserInfo', async (ctx, next) => {
  const { 
    request: { query }
  } = ctx;
  ctx.body = await getUserInfo(query);
})

/** 修改用户信息 */
router.put('/update/:id', async (ctx, next) => {
  const {
    params: { id },
    request: { body },
  } = ctx;
  ctx.body = await updateUserInfo(id, body);
})

/** 删除用户 */
router.del('/delete/:id', async (ctx, next) => {
  const {
    params: { id }
  } = ctx;
  ctx.body = await deleteUser(id);
})

/** 登录 */
router.post('/login', async (ctx, next) => {
  const { 
    request: { body }
  } = ctx;
  const { code, data: { password, ...userInfo } } = await getUserInfo(body, true);
  const { username } = userInfo;
  if (code === 0 && username && password && !ctx.session.userInfo) {
    ctx.session.userInfo = userInfo;
  }
  ctx.body = { code, data: userInfo };
})

module.exports = router;