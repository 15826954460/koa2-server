/**
 * @author 柏运送
 * @date 2021-02-22 21:27:30
 * @description 全局配置文件
*/

const { isDev, isProd, isTest } = require('./env.js');

/**
 * @description myslq 配置(硬盘数据库)
*/

let MySqlConfig = {
  database: 'koa2_xinlang_server', // 数据库名称
  dialect: 'mysql', // 声明操作的数据库类型
  prot: 3306, // 端口
}

/**
 * @description redis 配置(内存数据库)
 */
let RedisConfig = {
  prot: 6379, // 默认端口
  host: '127.0.0.1' // 本机域名地址
};

// 本地配置
let LocalConfig = {
  port: 9999
}

if (isDev) {
  // 开发环境配置
  MySqlConfig = {
    ...MySqlConfig,
    username: 'root', // 用户名
    password: 'bys', // 密码
  }
} else if (isTest) {
  // 测试环境配置
  MySqlConfig = {
    ...MySqlConfig,
  }

  RedisConfig = {
    ...RedisConfig,
  }
  // 测试环境配置
} else if (isProd) {
  // 生产环境配置
  MySqlConfig = {
    ...MySqlConfig,
    pool: {
      max: 5, // 连接池最大连接数量
      min: 0, // 连接池最小连接数量
      idle: 10000 // 如果一个连接池超过10秒钟没有被使用就释放
    }
  }

  RedisConfig = {
    ...RedisConfig,
  }
}

module.exports = {
  MySqlConfig,
  LocalConfig,
  RedisConfig
};
