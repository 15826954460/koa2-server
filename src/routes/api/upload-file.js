/**
 * @author 柏运送
 * @date 2021-03-10 23:37:57
 * @description 文件上传api
*/

const Router = require('koa-router');
const router = new Router();

const { loginCheck } = require('../../middleware/login-check');
const { fileUpload } = require('../../db/controller/file-upload');

// 设置路由前缀
router.prefix('/api/file');

/**
 * @description 文件上传 file 对象
 * @param { string } name 文件名
 * @param { string } path 文件路径
 * @param { string } type 文件类型
 * @param { number } size 文件名
*/

router.post('/upload', loginCheck, async (ctx, next) => {
  // 单个文件，返回文件对象，多个文件 返回列表
  const { request: { files } } = ctx;
  ctx.body = await fileUpload(files)
})

module.exports = router;