/**
 * @author 柏运送
 * @date 2021-02-22 22:04:34
 * @description 数据同步以及数据迁移 sync和drop操作是破坏性的.
*/

const seq = require('./index');

const { isDev } = require('../../config/env');

const { Users, Blogs } = require('../module/index'); // 引入数据模型

/**
 * @description 模型数据按需同步
 * @param { force: false } 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
 * @param { force: true } 将创建表,如果表已经存在,则将其首先删除
 * @param { alter: true } 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
*/
(async () => {
  try {
    if (!isDev) return; // 测试环境和生产环境建议使用更加优雅的方式
    await Promise.all([
      Users.sync({ force: false }),
      Blogs.sync({ force: false }),
    ]);
    console.log('自选模型均已成功同步.');
    process.exit(); // 退出程序
  } catch (err) {
    console.log(err);
  };
})();

/**
 * @description 一次性同步所有模型数据,仅供参考
 * @param { force } 参数说明通按需同步 
 * @param { match } Sequelize 使用 match 参数作为附加的安全检查,该检查将接受 RegExp  
*/
(
  async () => {
    // try {
    //   if (!isDev) return;
    //   await seq.sync({
    //     force: true,
    //     match: /^koa2_xinlang_server$/, // 仅当数据库名称为 'koa2_xinlang_server' 结尾时,它才会运行.sync()
    //   });
    //   console.log("所有模型均已成功同步.");
    //   process.exit(); // 退出程序
    // } catch (err) {
    //   console.log(err);
    // }
  }
)();

