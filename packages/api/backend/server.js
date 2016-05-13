const Promise = require('bluebird');
const Koa = require('koa');
const Router = require('koa-router');
const app = module.exports = new Koa();

const port = process.env.NODE_PORT || 3000;

let markoC = Promise.resolve(require('./routes/marko.js'));
let staticC = Promise.resolve(require('./routes/static.js'));

let route = new Router();

Promise.all([markoC, staticC])
	.then(configs => [].concat(...configs))
	.map(config => {
		let {method, path, handler, opts} = config;
		if (!Array.isArray(method)) method = [method];
		route.register(path, method, handler, opts);
	})
	.then(() => {
		for (item of route.stack) {
			console.log(item.path);
		}
	})
	.then(() => {
		app.use(route.routes());
		app.use(route.allowedMethods());
	})
	.then(() => {app.listen(port)})
	//port in use?
	.catch(() => {app.listen(30000)});