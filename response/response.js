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
    this.code = code
    if (data) {
      this.data = data
    }
    if (msg) {
      this.msg = msg
    }
  }
}

/**
 * @description success 数据模型
 */
class SuccessModule extends BaseModule {
  constructor({ data = {}, msg = '', code = 0 } = {}) {
    super({ code, data, msg })
  }
}

class ErrorModule extends BaseModule {
  constructor({ code = -1, msg = '', data = {} } = {}) {
    super({ code, msg, data })
  }
}


module.exports = {
  SuccessModule,
  ErrorModule,
}
