/**
 * @author 柏运送
 * @date 2021-02-22 21:57:45
 * @description 连表(外键关联)查询测试
*/

const { queryBlogWithUser, queryUserWithBlog } = require('../server/even-table-query');

// queryBlogWithUser();
// queryUserWithBlog();

module.exports = {
  queryBlogWithUser, queryUserWithBlog
}