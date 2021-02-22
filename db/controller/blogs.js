/**
 * @author 柏运送
 * @date 2021-02-22 21:56:26
 * @description blogs controller
*/

const { create, query } = require('../server/blogs');

// 新增用户
async function createBlog(body) {
  await create(body);
};

async function queryBlogs() {
  query();
}

// queryBlogs();

// createBlog({
//   title: 'blog001',
//   content: 'test content 001',
//   userId: 1,
//   test: 11111,
// });

module.exports = {
  createBlog,
  queryBlogs,
}