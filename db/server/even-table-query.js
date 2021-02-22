/**
 * @author 柏运送
 * @date 2021-02-22 22:06:54
 * @description 连表(外键关联)查询测试
*/

const seq = require('../seq');
const { Blogs, Users } = require('../module/index');
const { SuccessModule, ErrorModule } = require('../../response/response');
const { paramsError, sqlError, serverError } = require('../../response/error-info');

/**
 * 查询 blog 关联出对应的用户
 * 通过 belongsTo 建立的关联关系进行查询
*/
async function queryBlogWithUser() {
  return seq.transaction(async t => {
    const res = await Blogs.findAndCountAll({
      order: [
        ['id', 'desc']
      ],
      attributes: ['id', 'title', 'content'],
      include: [
        {
          model: Users, // 指定关联表
          attributes: ['username', 'nick_name', 'gender', 'id'],
          where: {}
        }
      ]
    }, {
        transaction: t
      });
    const { count, rows } = res;
    const result = rows.map(blog => {
      const blogVal = blog.dataValues;
      blogVal.user = blogVal.user.dataValues;
      return { count, ...blogVal };
    });
    return new SuccessModule(result);
  }).catch((err) => {
    console.log('------------', err);
    return new ErrorModule(sqlError);
  });
}

/**
 * 查询 user 关联出对应的blog
 * 通过 hasMany 建立的关联关系进行查询
*/
async function queryUserWithBlog() {
  return seq.transaction(async t => {
    const res = await Users.findAndCountAll({
      order: [
        ['id', 'desc']
      ],
      attributes: ['id', 'username', 'gender'],
      include: [
        {
          model: Blogs, // 指定关联表
          attributes: ['id', 'userId', 'title', 'content'],
          where: {}
        }
      ]
    }, {
        transaction: t
      });
    const { count, rows } = res;
    const result = rows.map(user => {
      const userVal = user.dataValues;
      userVal.blogs = userVal.blogs.map((blog) => {
        return blog.dataValues;
      });
      return { count, ...userVal };
    });
    return new SuccessModule(result);
  }).catch((err) => {
    console.log('------------', err);
    return new ErrorModule(sqlError);
  });
}

module.exports = {
  queryBlogWithUser, queryUserWithBlog
}