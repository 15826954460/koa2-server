/**
 * @author 柏运送
 * @date 2021-02-22 22:06:45
 * @description blogs server
*/

const seq = require('../seq');
const { Blogs } = require('../module/index');
const { SuccessModule, ErrorModule } = require('../../response/response');
const { paramsError, sqlError, serverError } = require('../../response/error-info');
const { Op } = require("sequelize");
const utils = require('../../utils/index');

// 创建blog
async function create(body) {
  const { userId, ...params } = body;
  if (!userId) {
    return new ErrorModule(paramsError);
  }
  return seq.transaction(async (t) => {
    await Blogs.create({ userId, ...params }, {
      transaction: t
    });
    return new SuccessModule();
  }).catch(err => {
    console.log('-----blog create err', err);
    return new ErrorModule(sqlError);
  });
}

// 查询 blog list
async function query(params = {}) {
  let where = {};
  const { limit, offset = 0, ...options } = params;
  if (JSON.stringify(options) !== '{}') {
    for (let [key, val] of Object.entries(options)) {
      where[key] = val;
    };
  }
  return seq.transaction(async t => {
    const res = await Blogs.findAndCountAll({
      attributes: ['id', 'userId', 'title', 'content'], // 查询属性
      where, // 查询条件
      offset,
      limit,
      order: [
        ['create_time', 'desc']
      ]
    }, {
        transaction: t
      });
    const { count, rows } = res;
    const result = rows.map((item) => {
      return { count, ...item.dataValues }
    });
    console.log(result);
    return new SuccessModule({ data: result });
  }).catch(err => {
    console.log('------blog query err', err);
    return new ErrorModule(sqlError);
  });
}

// 删除博客(支持批量删除)
async function destory(ids) {
  if (!ids) return new ErrorModule(paramsError);
  let or = [];
  if (utils.judgeType(ids) === 'array') {
    ids.forEach(id => {
      or.push({ id });
    });
  } else {
    or.push({ id: ids });
  }
  return seq.transaction(async (t) => {
    const res = await Blogs.destroy({
      where: {
        [Op.or]: or
      }
    }, {
        transaction: t
      });
    console.log('blogs destory----', res);
    return new SuccessModule();
  }).catch(err => {
    console.log('-----blogs destory err', err);
    return new ErrorModule(sqlError);
  })
}

module.exports = {
  create,
  query,
  destory
}