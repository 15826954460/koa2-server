/**
 * @author 柏运送
 * @date 2021-02-22 21:52:56
 * @description 接口返回统一封装
*/

/**
 * @description baseModule
 */
class BaseModule {
  constructor({ code, data, msg }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}

/**
 * @description success 数据模型
 */
class SuccessModule extends BaseModule {
  constructor({ code = 0, msg = 'success', data = {} } = {}) {
    super({ code, msg, data })
  }
}

class ErrorModule extends BaseModule {
  constructor({ code = -1, msg = 'error', data = {} } = {}) {
    super({ code, msg, data })
  }
}


module.exports = {
  SuccessModule,
  ErrorModule,
}
