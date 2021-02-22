/**
 * @author 柏运送
 * @date 2021-02-22 22:05:14
 * @description redis 简易封装
*/

const redis = require('reids');
const { redisConfig } = require('../../config');

// 创建客户端
const redisClient = redis.createClient(redisConfig.prot, redisConfig.host);

// 判断链接是否成功
redisClient.on('error', err => {
  console.error('redis error', err);
});

const redisApi = {
  /**
   * @description redis set
   * @param {string} key 键
   * @param {string} val 值
   * @param {number} timeout 过期时间 单位 s
   */
  set: ({ key, val, timeout = 60 * 60 } = {}) => {
    if (!key) return;
    if (typeof val === 'object' || typeof val === 'number') {
      val = JSON.stringify(val);
    };
    redisClient.set(key, val); // 设置值
    redisClient.expire(key, timeout); // 设置过期时间
  },

  /**
   * @description reids get
   * @param {string} key 键
   */
  get: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, val) => {
        if (err) {
          reject(err);
          return;
        }
        if (val === null) {
          resolve(val);
          return;
        }
        try {
          resolve(JSON.parse(val))
        } catch (result) {
          resolve(result)
        }
      })
    });
  }
};

module.exports = redisApi;
