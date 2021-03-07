/**
 * @author 柏运送
 * @date 2021-02-22 22:07:03
 * @description user server
*/

const seq = require('../seq');
const { Users } = require('../module/index');
const { SuccessModule, ErrorModule } = require('../../response/response');
const { sqlError, loginError } = require('../../response/error-info');

// 判断用户是否已存在
async function hasExitsUser(username) {
  return seq.transaction(async (t) => {
    const result = await Users.findOne({
      where: { username },
      transaction: t
    });
    return result;
  }).catch((err) => {
    console.log('---user hasExitsUser err', err);
    return new ErrorModule(sqlError);
  });
}

// 创建用户
async function create(params) {
  return seq.transaction(async (t) => {
    // 创建用户
    await Users.create(
      params,
      { transaction: t }
    );
    return new SuccessModule();
  }).catch(err => {
    console.error('---user create err', err);
    return new ErrorModule(sqlError);
  });
}

// 获取用户信息
async function query(id) {
  let attributes = ['id', 'username', 'nickName', 'gender', 'picture', 'city', 'email'];
  return seq.transaction(async (t) => {
    const result = await Users.findOne({
      attributes, // 查询字段
      where: { id },
      transaction: t,
    });
    return new SuccessModule({ data: result });
  }).catch(err => {
    console.log('------user query err', err);
    return new ErrorModule(sqlError);
  });
}

// 修改用户信息
async function update(id, params) {
  return seq.transaction(async (t) => {
    await Users.update(params, {
      where: { id },
      transaction: t
    });
    return new SuccessModule();
  }).catch(err => {
    console.log('------user update err', err);
    return new ErrorModule(sqlError);
  });
}

// 查询用户
// async function query(params = {}) {
//   let where = {};
//   const { limit, offset = 0, ...options } = params;
//   if (JSON.stringify(options) !== '{}') {
//     for (let [key, val] of Object.entries(options)) {
//       where[key] = val;
//     };
//   }
//   return seq.transaction(async t => {
//     const res = await Users.findAndCountAll({
//       attributes: ['id', 'username', 'nickName', 'gender', 'picture', 'city', 'email'], // 查询属性
//       where, // 查询条件
//       limit,
//       offset,
//       order: [
//         ['create_time', 'desc'], // 创建时间倒序
//         ['id', 'asc'], // id 升序
//       ], // 排序
//     }, {
//       transaction: t
//     });
//     const { count, rows } = res;
//     const result = rows.map((item) => {
//       return { count, ...item.dataValues }
//     });
//     console.log('------------', result);
//     return new SuccessModule({ data: result });
//   }).catch(err => {
//     console.log('------user query err', err);
//     return new ErrorModule(sqlError);
//   });
// }

// 删除用户(建立了外键关联会自动删除用户对应的blog)
async function destory(id) {
  return seq.transaction(async (t) => {
    await Users.destroy({
      where: { id },
      transaction: t
    });
    return new SuccessModule();
  }).catch((err) => {
    console.log('------user destory err', err);
    return new ErrorModule(sqlError);
  });
}

// 用户登录
async function login(params) {
  let attributes = ['id', 'username', 'nickName', 'gender', 'picture', 'city', 'email'];
  return seq.transaction(async (t) => {
    const result = await Users.findOne({
      attributes, // 查询字段
      where: params,
      transaction: t,
    });
    if (result) {
      return new SuccessModule({ data: result });
    }
    // 账号或密码错误
    return new ErrorModule(loginError);;
  }).catch(err => {
    console.error('------user query err', err);
    return new ErrorModule(sqlError);
  });
}

module.exports = {
  create, query, destory, update, hasExitsUser, login,
}