/**
 * @author 柏运送
 * @date 2021-02-22 21:59:05
 * @description users 表数据模型
*/

const seq = require('../seq/index');
const { DataTypes } = require('sequelize');

/** 定义数据模型 */
const Users = seq.define('users', {
  id: {
    type: DataTypes.INTEGER, // 整数类型
    primaryKey: true, // 主键
    allowNull: false, // 非 null
    autoIncrement: true, // 自动递增
    comment: '用户唯一id', // 描述
  },
  username: {
    type: DataTypes.STRING, // 字符串类型
    allowNull: false,
    comment: '用户名',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment: '别名',
  },
  gender: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 3,  // 默认值
    comment: '性别(1:男 2:女 3:保密)',
    validate: {
      isIn: {
        args: [[1, 2, 3]],
        msg: 'gender invalid 1 2 3', // 自定义错误信息
      },
    }, // 模型验证(https://itbilu.com/nodejs/npm/V1PExztfb.html#definition-configuration)
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment: '用户头像',
    validate: {
      isUrl: function (url) {
        let reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
        if (url && !reg.test(url)) {
          throw new Error('picture url invalid');
        }
      }
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment: '城市',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
    comment: '邮箱',
    validate: {
      isEmail: function (val) {
        if (val && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)) {
          throw new Error('email invalid');
        }
      } // 自定义验证
    }
  },
}, {
    timestamps: true, // 默认允许创建时间
    // createdAt: false, // 不创建 createdAt
    createdAt: 'create_time', // 不创建 createdAt
    updatedAt: 'update_time', // 修改自动创建的 updateAt 名称
    freezeTableName: true, // 冻结表名,不使用sequilize默认规则
    tableName: 'users', // 自定义表名
    underscored: false, // false: 默认使用驼峰命名 true:不使用驼峰命名 updateAt => update_at
  });

// console.log(Users === seq.models.Users);

module.exports = Users;