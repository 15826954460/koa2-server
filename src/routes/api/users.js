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

/**
 * @description 创建用户
 * @param { string } username 用户名 必填
 * @param { string } password 密码 必填
 * @param { string } nickName 别名 非必填
 * @param { number } gender 性别(1:男 2:女 3:保密) 非必填
 * @param { string } picture 用户头像 非必填
 * @param { string } city 城市 非必填
 * @param { string } email 邮箱 非必填
 * }
*/
router.post('/create', async (ctx, next) => {
  const { 
    request: { body }
  } = ctx;
  ctx.body = await createUser(body);
});

/**
 * @description 获取用户信息
 * @param { int } userId 用户id 必填
*/
router.get('/getUserInfo', async (ctx, next) => {
  const { 
    request: { query }
  } = ctx;
  ctx.body = await getUserInfo(query);
})

/**
 * @description 修改用户信息
 * @param { int } id 用户id 必填
*/
router.put('/update/:id', async (ctx, next) => {
  const {
    params: { id },
    request: { body },
  } = ctx;
  ctx.body = await updateUserInfo(id, body);
})

/**
 * @description 删除用户
 * @param { int } id 用户id 必填
*/
router.del('/delete/:id', async (ctx, next) => {
  const {
    params: { id }
  } = ctx;
  ctx.body = await deleteUser(id);
})

/**
 * @description 登录
 * @param { string } username 用户名 必填
 * @param { string } password 密码 必填
*/
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