/**
 * @author 柏运送
 * @date 2021-02-22 22:04:06
 * @description sequelize 创建数据库连接
*/

const { Sequelize } = require('sequelize');
const { MySqlConfig } = require('../../config/index');
const { database, username, password, host, dialect, port, pool } = MySqlConfig;

const __conf = {
  host,
  dialect,
  port,
  pool,
}

/**
 * 连接数据库
 */
const seq = new Sequelize(database, username, password, __conf);

/**
 * 测试数据库是否连接成功
 */
seq.authenticate().then(() => {
  console.log('ok');
}).catch(err => {
  console.log(err);
});

/**
 * 关闭连接
 */
// sequelize.close();

module.exports = seq;
