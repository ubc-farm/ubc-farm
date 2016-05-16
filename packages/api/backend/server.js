const Promise = require('bluebird');
const Koa = require('koa');
const router = require('koa-router')();
const layers = require('./routes');

const port = process.env.NODE_PORT || 3000;
let app = module.exports = new Koa();

Promise.all([markoC, staticC])
	.then(configs => [].concat(...configs))
	.map(config => {
		let {method, path, middleware, opts} = config;
		if (!Array.isArray(method)) method = [method];
		router.register(path, method, middleware, opts);
	})
	.then(() => {
		app.use(router.routes());
		app.use(router.allowedMethods());
	})
	.then(() => {app.listen(port)})
	//port in use?
	.catch(() => {app.listen(30000)});