/**
 * @author 柏运送
 * @date 2021-03-07 19:16:45
 * @description 密码加密工具方法
*/

const crypto = require('crypto')
const { CRYTPO_SECRET_KEY } = require('../constants/keys')

/**
 * @description md5 加密
 * @param {string} content 明文
*/
function _md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * @description 加密方法
 * @param {string} content 明文
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYTPO_SECRET_KEY}`
    return _md5(str)
}

module.exports = doCrypto
