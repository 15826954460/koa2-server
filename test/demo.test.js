/**
 * @author 柏运送
 * @date 2021-02-25 20:53:10
 * @description 单元测试
*/

const assert = require('assert');
const server = require('./server');

// 判断数据用列
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the [1, 2, 3] is not have 4', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

function sum(a, b) {
  return a + b;
}

// 求和用列
describe('求和', function() {
  describe('sum', function() {
    it('1 add 3 should return 4', () => {
      assert.equal(sum(1, 3), 4);
    });
  });
});

// 接口测试用列
describe('http get json', () => {
  it(`get json 返回数据格式正确`, async () => {
    const getRes = await server.get('/json'); // get 请求
    // const posRes = await server.post('/login').send({
    //   userName: 'xxxx',
    //   password: 123,
    // }); // post 请求
    assert.deepStrictEqual(getRes.body, { title: 'koa2 json' });
  });

  it(`get string 返回数据类型正确`, async () => {
    const getRes = await server.get('/string'); // get 请求
    assert.ok(getRes.body, 'koa2 string');
  });
});