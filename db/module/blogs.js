/**
 * @author 柏运送
 * @date 2021-02-22 21:58:30
 * @description blogs 表数据模型
*/

const seq = require('../seq/index');
const { DataTypes } = require('sequelize');

const Blogs = seq.define('blogs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '博客id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment: '标题'
  },
  content: {
    type: DataTypes.TEXT, // 文本类型
    allowNull: true,
    defaultValue: '',
    comment: '博客内容'
  }
}, {
  timestamps: true, // 默认允许创建时间
  createdAt: 'create_time', // 不创建 createdAt
  updatedAt: 'update_time', // 修改自动创建的 updateAt 名称
  freezeTableName: true, // 冻结表名,不使用sequilize默认规则
  tableName: 'blogs',
});

module.exports = Blogs;