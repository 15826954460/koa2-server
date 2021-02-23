/**
 * @author 柏运送
 * @date 2021-02-22 21:56:26
 * @description blogs controller
*/

const { create, query, destory } = require('../server/blogs');

// 新增用户
async function createBlog(body) {
  await create(body);
};

// createBlog({
//   title: '' + Math.random(),
//   content: 'test content 001',
//   userId: 2,
//   test: 11111,
// });

async function queryBlogs() {
  query({ userId: 2 });
  query();
}

// queryBlogs();

async function del() {
  destory([12, 13]);
}

// del();

module.exports = {
  createBlog,
  queryBlogs,
}