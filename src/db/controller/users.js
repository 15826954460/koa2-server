/**
 * @author 柏运送
 * @date 2021-02-22 21:56:53
 * @description users cotroller
*/

const { create, query, destory, update } = require('../server/users');

/**
 * @description 创建用户
 * @param { ussename, password, nickName, gender, picture, city, email } 用户信息对象
*/
async function createUser(body) {
  return await create(body);
};

/**
 * @description 获取用户信息
 * @param { userId, username, password } 用户 id, 用户名, 密码
*/
async function getUserInfo(params = {}, isNeedPwd) {
  return await query(params, isNeedPwd);
}

/**
 * @description 删除用户
 * @param { userId } 用户 id
*/
async function deleteUser(userId) {
  return await destory(userId);
}

/**
 * @description 修改用户信息
 * @param { userId } 用户 id
*/
async function updateUserInfo(userId) {
  return await update(userId);
}

module.exports = {
  createUser,
  deleteUser,
  updateUserInfo,
  getUserInfo,
}