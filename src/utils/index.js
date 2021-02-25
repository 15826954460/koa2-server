/**
 * @author 柏运送
 * @date 2021-02-22 21:51:07
 * @description 全局工具函数
*/

module.exports = {
  judgeType: (val) => {
    const str = Object.prototype.toString(val);
    return str.slice(8, str.length -1).toLowerCase();
  }
};