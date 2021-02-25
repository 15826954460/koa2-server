/**
 * @author 柏运送
 * @date 2021-02-22 21:26:55
 * @description 环境变量
*/

const ENV = process.env.NODE_ENV;

module.exports = {
  isDev: ENV === 'development',
  isProd: ENV === 'production',
  isTest: ENV === 'test'
}