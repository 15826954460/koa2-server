/**
 * @author 柏运送
 * @date 2021-02-22 21:52:22
 * @description 错误信息统一管理
*/

module.exports = {
  userHasExits: {
    code: 10002,
    msg: '用户已存在'
  },
  paramsError: {
    code: 10001,
    msg: 'Invalid params'
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