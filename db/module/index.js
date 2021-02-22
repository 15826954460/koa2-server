/**
 * @author 柏运送
 * @date 2021-02-22 21:59:59
 * @description 数据模型统一管理
*/

const Users = require('./users');
const Blogs = require('./blogs');

/**
 * @description 外键关联
 * 写法一: a表 belongsto b表  => 查询结果，通过查询blog带出用户
 * 写法二: a表 hasMany b表 => 查询结果，通过查询用户带出blog
*/

Blogs.belongsTo(Users, {
  foreignkey: 'userId',   // 外键关联的key, Blogs.userId => User.id
});

Users.hasMany(Blogs, {
  foreignkey: 'userId',  // 外键关联的key, Blogs.userId => User.id 
});

module.exports = {
  Users,
  Blogs,
}