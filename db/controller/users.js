/**
 * @author 柏运送
 * @date 2021-02-22 21:56:53
 * @description users cotroller
*/

const { create, query } = require('../server/users');

// 新增用户
async function createUser(body) {
  await create(body);
};

async function queryUserList() {
  query({ id: 1 });
  // query({ limit: 1, offset: 1});
  // query();
}

queryUserList();

// createUser({
//   username: 'test_001',
//   password: 'test_001',
//   gender: 2
// });

module.exports = {
  createUser,
  queryUserList,
}