'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  app.on('request', ctx => {
    // console.log('request', ctx.request);
  });
  router.get('/', controller.home.index);
  // 接收参数的路由：http://localhost:7001/params?name=tirion
  router.get('/params', controller.home.params);
  // 另一种接收参数的路由：http://localhost:7001/params2/30
  router.get('/params2/:age', controller.home.params2);
  // 获取 post 提交内容
  router.post('/post', controller.home.post);
  // 提交内容校验
  router.post('/validate', controller.home.validate);
  // 重定向： /abc 重定向到 /
  router.redirect('/abc', '/', 302);
  // controller 里重定向
  router.get('/redirect', controller.home.redirect);
  router.get('/news', controller.home.list);
  // mysql 测试
  router.get('/mysql/:name/:age', controller.home.mysql);

  // sequelize 测试
  router.get('/sequelize/:id', controller.sequelize.get);  // 通过 id 查询
  router.get('/sequelize_name/:name', controller.sequelize.getName);  // 通过 name 查询
  router.get('/created_at/:date', controller.sequelize.createdAt);  // 通过 created_at 进行日期区间查询
  router.get('/sequelize_insert/:name/:age', controller.sequelize.insert);  // 插入
};
