const isJSON = require('koa-is-json');
const zlib = require('zlib');

// middleware 接收一个 options，在 config 里进行配置
module.exports = options => {
    return async function gzip(ctx, next) {
        await next();  // 因为 gzip 压缩是最后一步，所以先执行后面的中间件

        // 后续中间件执行完成后将响应体转换成 gzip
        let body = ctx.body;
        if (!body) return;

        // ctx.length < options.threshold 则不进行 gzip 压缩
        if (options.threshold && ctx.length < options.threshold) return;

        if (isJSON(body)) body = JSON.stringify(body);

        // 设置 gzip body，修正响应头
        const stream = zlib.createGzip();
        stream.end(body);
        ctx.body = stream;
        ctx.set('Content-Encoding', 'gzip');
    };
};