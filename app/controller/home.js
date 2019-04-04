'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(c) {  // 通过路由调用的时候会接收到一个参数，这个参数就是 this.ctx。c === this.ctx
    const { ctx } = this;
    ctx.body = 'hi, egg';  // ctx.body 是 ctx.response.body 的缩写
  }
  // http://localhost:7001/params?name=tirion，通过 query.name 拿到 tirion
  async params() {
    const { ctx } = this;
    ctx.body = `name=${ctx.query.name}`;
  }
  // http://localhost:7001/params2/30，通过 params.age 拿到 30
  async params2() {
    const { ctx } = this;
    ctx.body = `age=${ctx.params.age}`;
  }
  // post 提交，通过 ctx.request.body 拿到请求的 body 体里的内容
  async post() {
    const { ctx } = this;
    ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
  }
  // 表单校验
  async validate() {
    // 配置校验规则
    const createRule = {
      username: {
        type: 'email',
      },
      password: {
        type: 'password',
        compare: 're-password',
      },
    };

    const { ctx } = this;
    ctx.validate(createRule);  // 使用 validate 方法进行校验
    ctx.body = ctx.request.body;
  }
  // 重定向
  async redirect() {
    const { ctx } = this;
    ctx.redirect('/');
  }
  // mysql 测试
  async mysql() {
    const { ctx } = this;
    const res = await ctx.service.user.addUser(ctx.params.name, ctx.params.age);
    ctx.body = res;
  }
  // curl 获取数据（貌似接口已经被屏蔽了）
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = HomeController;
