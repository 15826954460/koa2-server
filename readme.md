## Project
node-js-koa-server

#### project start
```
1. npm install
2. npm run dev
```

#### Git url
`
https://github.com/15826954460/koa2-server.git
`

#### git提交规范
| 类型 | 备注 |
|:-------- |:---- |
| feat: xxx     | 新功能（feature）|
| fix: xxx      | 修补bug|
| docs: xxx     | 文档（documentation）|
| desc: xxx     | 备注（description）|
| style: xxx    | 格式（不影响代码运行的变动）|
| refact: xxx   | 重构（refactor 既不是新增功能，也不是修改bug的代码变动）|
| test: xxx     | 增加测试 |
| chore: xxx    | 构建过程辅助工具的变动 |
| markdown: xxx | 编辑markdown文档 |

#### Init package.json
npm init -y 初始化json文件

#### chrome 调试
```js
- "dev": "cross-env NODE_ENV=development ./node_modules/.bin/nodemon bin/www",
+ "dev": "cross-env NODE_ENV=development ./node_modules/.bin/nodemon --inspect=9229 bin/www",
```
- 运行项目: npm run dev
- 浏览器启动项目: localhost:9999
- 打开新的窗口,输入 chrome://inspect 点击 Open dedicated DevTools for Node 即可查看日志
- 支持直接输入 debugger 进行调试

#### 第三方依赖
- [mysql2 数据库](https://www.npmjs.com/package/mysql2)
- [sequelize ORM框架](https://www.sequelize.com.cn/core-concepts/model-basics)
- [koa-generic-session 创建session](https://www.npmjs.com/package/koa-generic-session)
- [koa-redis reids 连接](https://www.npmjs.com/package/koa-redis)
- [redis 内存数据库](https://www.npmjs.com/package/redis)
- [jest 单元测试](https://jestjs.io/docs/en/getting-started)
- [mocha document](https://mochajs.org/#parallel-tests)
- [supertest 接口请求测试](https://www.npmjs.com/package/supertest)
- [should 单元测试](https://github.com/tj/should.js)
- [pre-commit 提交前预校验](https://www.npmjs.com/package/pre-commit)
- [nodejs inspect 调试](https://nodejs.org/en/docs/inspector)
- [模型验证](https://itbilu.com/nodejs/npm/V1PExztfb.html#definition-configuration)
- [koa-jwt](https://www.npmjs.com/package/koa-jwt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

#### jwt 使用说明
```
// app.js 中添加jwt中间件,放在路由前
+ app.use(koaJwt({ 
+  secret: JWT_SECRET_KEY
+ }).unless({
+  path: [/^\/users\/login/, /^\/test\/login/]
+ })); // unless 排除路由的 验证的路由

// 加密使用参考 https://www.npmjs.com/package/jsonwebtoken

// 客户端如何携带加密的token进行服务端 jwt 验证, 参考 https://jwt.io/introduction/
// 请求头中携带字段
Authorization: Bearer (服务端返回给前端的token)
```

#### 登录存储用户相关信息 jwt vs session
| jwt | session |
|:-------- |:---- |
| 用户信息加密存储在客户端,不依赖cookie,可跨域     | 用户信息加密存储在服务端,依赖cookie,不可跨域 |
| 更适合服务节点较多,跨域比较多的系统 | 更适合统一的web服务,server 要求严管用户信息|

#### mocha 单元测试
`
默认执行test文件目录所有以 test.js 结尾的文件
`

#### eslint 代码检查
`
默认执行src下的所有js
`

##### 学习记录
jest 基本使用 3-15