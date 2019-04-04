'use strict';

module.exports = appInfo => {
  const config = {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1554200483753_8593',
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.tpl': 'nunjucks',
      },
    },
  };

  const serviceConfig = {
    news: {
      pageSize: 5,
      serverUrl: 'https://hacker-news.firebaseio.com/v0',
    }
  };

  // middleware 配置
  const middleware = {
    middleware: ['gzip'],  // 加载的 middleware
    gzip: {  // middleware 接收的参数
      threshold: 1024,
    }
  };

  // MySQL 配置
  const mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'test',
    },
  };

  // sequelize 配置
  const sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'test',
    username: 'root',
    password: 'root',
    timezone: '+08:00',  // 配置时区
  };

  return {
    ...config,
    ...serviceConfig,
    ...middleware,
    mysql,
    sequelize,
  };
};
