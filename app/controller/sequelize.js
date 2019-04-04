const Controller = require('egg').Controller;

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}
// sequelize 测试
class SequelizeController extends Controller {
    async get() {
        const { ctx } = this;
        ctx.body = await ctx.model.User.findById(toInt(ctx.params.id));
    }
    async getName() {
        const { ctx } = this;
        const res = await ctx.model.User.findByName(ctx.params.name);
        if (res) {
            ctx.body = res;
        } else {
            ctx.body = '没有找到';
        }
    }
    async createdAt() {
        const { ctx } = this;
        const res = await ctx.model.User.findAll({
            where: {
                created_at: {
                    $lt: new Date(),  // 小于当前时间的
                    // $lt: new Date(new Date() - 1000 * 60 * 60 * 24 * 1),  // 小于当前时间一天前的
                    // $lt: new Date('2019-04-03'),  // 小于 2019-04-03 08:00:00
                    // $lt: new Date('2019-04-03 00:00:00'),  // 小于 2019-04-03 00:00:00
                    $gt: new Date(ctx.params.date)  // 接收到的日期字符串，如：2019-4-1
                }
            }
        });
        ctx.body = res;
    }
    async insert() {
        const { ctx } = this;
        const { name, age } = ctx.params;
        const res = await ctx.model.User.findByName(name);
        if (!res) {
            ctx.body = await ctx.model.User.create({ name, age });
        } else {
            ctx.body = '用户已存在';
        }
    }
}

module.exports = SequelizeController;