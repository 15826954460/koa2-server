/**
 * @author 柏运送
 * @date 2021-02-25 22:04:54
 * @description 路由入口文件
*/

const demo = require('./demo');
const users = require('./api/users');
const uploadFile = require('./api/upload-file');

module.exports = {
  demo, users, uploadFile
}