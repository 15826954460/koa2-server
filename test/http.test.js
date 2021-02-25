/**
 * @author 柏运送
 * @date 2021-02-25 21:12:28
 * @description 
*/

const assert = require('assert');
const server = require('./server');

describe('http get json', () => {
  it(`get json 返回数据格式正确`, async () => {
    const getRes = await server.get('/json'); // get 请求
    const posRes = await server.post('/login').send({
      userName: 'xxxx',
      password: 123,
    }); // post 请求
    assert.deepStrictEqual(getRes.body, { title: 'koa2 json' });
  });

  it(`get string 返回数据类型正确`, async () => {
    const getRes = await server.get('/string'); // get 请求
    assert.ok(getRes.body, 'koa2 string');
  });
});