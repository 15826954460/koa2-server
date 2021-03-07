/**
 * @description 登录验证的中间件
 * @author 双越老师
 */

const { ErrorModule } = require('../response/response')
const { hasNoLoginErrorInfo } = require('../response/error-info')

/**
 * @description 登录验证
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModule(hasNoLoginErrorInfo)
}

module.exports = {
  loginCheck
}