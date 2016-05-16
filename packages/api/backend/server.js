const Promise = require('bluebird');
const Koa = require('koa');
const router = require('koa-router')();
const app = module.exports = new Koa();

const port = process.env.NODE_PORT || 3000;

let markoC = Promise.resolve(require('./routes/marko.js'));
let staticC = Promise.resolve(require('./routes/static.js'));

Promise.all([markoC, staticC])
	.then(configs => [].concat(...configs))
	.map(config => {
		let {method, path, handler, opts} = config;
		if (!Array.isArray(method)) method = [method];
		router.register(path, method, handler, opts);
	})
	.then(() => {
		app.use(router.routes());
		app.use(router.allowedMethods());
	})
	.then(() => {app.listen(port)})
	//port in use?
	.catch(() => {app.listen(30000)});