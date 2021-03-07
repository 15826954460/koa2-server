/**
 * @author 柏运送
 * @date 2021-03-07 21:41:42
 * @description json schema 校验工具函数
*/

const Ajv = require('ajv');
const ajv = new Ajv();
/**
 * @description 
 * @param {Object} schema json schema 校验规则对象
 * @param {Object} data 待校验的数据
*/
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  // 校验失败
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
