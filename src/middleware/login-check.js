/**
 * @author 柏运送
 * @date 2021-03-08 21:35:03
 * @description 登录中间件
*/

const { ErrorModule } = require('../response/response')
const { hasNoLoginErrorInfo } = require('../response/error-info')

/**
 * @description 登录验证
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    return await next();
  }
  // 未登录
  ctx.body = new ErrorModule(hasNoLoginErrorInfo)
}

module.exports = {
  loginCheck
}