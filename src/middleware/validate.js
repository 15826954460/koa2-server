/**
 * @author 柏运送
 * @date 2021-03-07 22:03:48
 * @description 数据格式校验中间件
*/

const { ErrorModule } = require('../response/response')
const { validateDataError } = require('../response/error-info')

/**
 * @description 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFun) {
  // 定义中间件函数
  async function __validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFun(data)
    if (error) {
      // 验证失败
      ctx.body = new ErrorModule(validateDataError)
      return
    }
    // 验证成功，继续
    await next()
  }
  // 返回中间件
  return __validator
}

module.exports = {
  genValidator
}
