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
  validateDataError: {
    code: 10006,
    msg: '数据格式有误,请重新检查',
  },
  hasNoLoginErrorInfo: {
    code: 10007,
    msg: "您尚未登录,请登录后再访问"
  },
  fileUploadFail: {
    code: 10008,
    msg: "未获取到文件"
  },
  fileUploaSizeFail: {
    code: 10009,
    msg: "文件大小超出限制"
  },
  fileUploadTypeFail: {
    code: 10010,
    msg: "文件类型不支持"
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