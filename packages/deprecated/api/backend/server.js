const Promise = require('bluebird');
const Koa = require('koa');
const router = require('koa-router')();
const layers = require('./routes');

//const port = process.env.NODE_PORT || 3000;
let app = module.exports = new Koa();

/**
 * Configures middleware from routes/ and attaches to Koa server
 * @var {Promise<Koa>}
 */
module.exports = layers.map(config => {
		let {method, path, middleware, opts} = config;
		if (!Array.isArray(method)) method = [method];
		router.register(path, method, middleware, opts);
	})
	.then(() => {
		app.use(router.routes());
		app.use(router.allowedMethods());
		return app;
	})
	//.then(() => {app.listen(port)})
	//port in use?
	//.catch(() => {app.listen(30000)});