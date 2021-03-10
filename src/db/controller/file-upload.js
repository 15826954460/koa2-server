/**
 * @author 柏运送
 * @date 2021-03-10 23:49:47
 * @description file upload
*/

const fse = require('fs-extra');
const path = require('path');
const { ErrorModule, SuccessModule } = require('../../response/response')
const { fileUploadFail, fileUploaSizeFail, fileUploadTypeFail } = require('../../response/error-info');
const { FILE_SIZE_LIMIT, FILE_TYPE_LIMIT } = require('../../constants');

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '../../../uploadFiles')

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

async function fileUpload(files) {
  const file = files.file;
  const { size, path: filePath, name, type } = file;
  if (!file) {
    await fse.remove(path);
    return new ErrorModule(fileUploadFail);
  }
  if (size > FILE_SIZE_LIMIT) {
    await fse.remove(path);
    return new ErrorModule(fileUploaSizeFail);
  }
  if (FILE_TYPE_LIMIT.length && !FILE_TYPE_LIMIT.includes(type)) {
    await fse.remove(path);
    return new ErrorModule(fileUploadTypeFail);
  }

  // 移动文件
  const fileName = `${Date.now()}.${name}` // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的文件夹
  
  await fse.move(filePath, distFilePath);
  // 实际开发过程中文件上传到第三方服务器
  return new SuccessModule({ data: { size, filePath, name, type } });
}

module.exports = {
  fileUpload
}