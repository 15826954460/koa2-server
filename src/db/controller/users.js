/**
 * @author 柏运送
 * @date 2021-02-22 21:56:53
 * @description users cotroller
*/

const { 
  create, query, destory, update, hasExitsUser
} = require('../server/users');
const { paramsError } = require('../../response/error-info');
/**
 * @description 创建用户
 * @param { ussename, password, nickName, gender, picture, city, email } 用户信息对象
*/
async function createUser(body) {
  const { username, password } = body;
  if (!username || !password) return new ErrorModule(paramsError);
  const result = await hasExitsUser(username);
  if (result) {
    return result;
  }
  return await create(body);
};

/**
 * @description 获取用户信息
 * @param { userId, username, password } 用户 id, 用户名, 密码
*/
async function getUserInfo(params = {}, isNeedPwd) {
  const { userId, username, password } = params;
  if (!userId && !(username && password)) {
    return new ErrorModule(paramsError);
  }
  return await query(params, isNeedPwd);
}

/**
 * @description 删除用户
 * @param { userId } 用户 id
*/
async function deleteUser(id) {
  if (!id) return new ErrorModule(paramsError);
  return await destory(id);
}

/**
 * @description 修改用户信息
 * @param { userId } 用户 id
*/
async function updateUserInfo(id, body) {
  if (!id) return new ErrorModule(paramsError);
  return await update(id, body);
}

module.exports = {
  createUser,
  deleteUser,
  updateUserInfo,
  getUserInfo,
}