/**
 * @author 柏运送
 * @date 2021-02-22 21:52:22
 * @description 错误信息统一管理
*/

module.exports = {
  paramsError: {
    code: 10001,
    msg: 'Invalid params'
  },
  userHasExits: {
    code: 10002,
    msg: '用户已存在'
  },
  userHasNoExits: {
    code: 10004,
    msg: '用户名不存在'
  },
  loginError: {
    code: 10005,
    msg: '用户名或密码错误'
  },
  sqlError: {
    code: 10064,
    msg: 'Sql error'
  },
  serverError: {
    code: 501,
    msg: 'Server error'
  }
}