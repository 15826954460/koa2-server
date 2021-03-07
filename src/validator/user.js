/**
 * @author 柏运送
 * @date 2021-03-07 21:58:57
 * @description user 数据格式校验 
 * 字段定义规则 参考 https://blog.csdn.net/u012219045/article/details/98872192
*/

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  title: "Product",
  description: "A product from Acme's catalog",
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255
    },
    picture: {
      type: 'string',
      maxLength: 255
    },
    city: {
      type: 'string',
      maxLength: 255,
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  },
  required: [ "userName", "password" ]
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = userValidate
