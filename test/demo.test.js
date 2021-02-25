/**
 * @author 柏运送
 * @date 2021-02-25 20:53:10
 * @description 单元测试
*/

const assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

function sum(a, b) {
  return a + b;
}

describe('求和', function() {
  describe('sum', function() {
    it('1 add 3 should return 4', () => {
      assert.equal(sum(1, 3), 4);
    });
  });
});