/**
 * @author 柏运送
 * @date 2021-02-22 21:56:53
 * @description users cotroller
*/

const {
  create, query, destory, update, hasExitsUser, login
} = require('../server/users');
const { ErrorModule } = require('../../response/response');
const { paramsError, userHasNoExits, userHasExits } = require('../../response/error-info');
const doCrypto = require('../../utils/crypto');

/** 创建用户 */
async function createUser(body) {
  const { username, password, nickName, ...params } = body;
  if (!username || !password) return new ErrorModule(paramsError);
  const result = await hasExitsUser(username);
  if (result) {
    return new ErrorModule(userHasExits);
  }
  return await create({
    ...params, username,
    password: doCrypto(password),
    nickName: nickName || username 
  });
};

/** 获取用户信息 */
async function getUserInfo(id) {
  if (!id) return new ErrorModule(paramsError);
  return await query(id);
}

/** 删除用户 */
async function deleteUser(id) {
  if (!id) return new ErrorModule(paramsError);
  return await destory(id);
}

/** 修改用户信息 */
async function updateUserInfo(id, body) {
  if (!id) return new ErrorModule(paramsError);
  return await update(id, body);
}

/** 登陆 */
async function userLogin(params) {
  const { username, password } = params;
  if (!username || !password) {
    return new ErrorModule(paramsError);
  }
  // 判断用户名是否存在
  const result = await hasExitsUser(username);
  if (!result) {
    return new ErrorModule(userHasNoExits);
  }
  return await login({ username, password });
}

module.exports = {
  createUser,
  deleteUser,
  updateUserInfo,
  getUserInfo,
  userLogin,
}