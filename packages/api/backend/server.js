const Koa = require('koa');
const app = module.exports = new Koa();

//const router = require('./routes');
const port = process.env.NODE_PORT || 3000;

//app.use(router.routes());
//app.use(router.allowedMethods());

app.listen(port);