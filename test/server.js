/**
 * @author 柏运送
 * @date 2021-02-25 21:10:23
 * @description test server
*/

/**
 * 独立引入
 */
// const supertest = require('supertest');
// const Koa = require('koa');
// const app = new Koa()
// const Router = require('koa-router');
// const router = new Router();
// app.use(router.routes(), router.allowedMethods());

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json',
//   }
// })

// 基于app.js做真的接口做单元测试
const supertest = require('supertest');
const server = require('../app').callback();

module.exports = supertest(server);