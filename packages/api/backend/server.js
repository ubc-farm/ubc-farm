const Koa = require('koa');
const router = require('./routes');
const app = module.exports = new Koa();

const port = process.env.NODE_PORT || 3000;

console.log(router.routes());

app.use((ctx, next) => {
	console.log(ctx.path);
	return next()
})
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);