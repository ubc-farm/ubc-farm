const send = require('koa-send');
const path = require('path').posix;

const staticDir = process.env.WWW_STATIC;

/**
 * Uses koa-send to send a file. 
 * @param {boolean} ctx.signed - if the file has a content hash
 */
function sendFile(ctx, next) {
	return next().then(() => {
		return send(ctx, ctx.path, {
			root: staticDir,
			setHeaders: res => {
				if (ctx.signed) {
					res.setHeader('Cache-Control', 'max-age=31536000');
				} else {
					res.setHeader('Cache-Control', 'no-cache');
				}
			}
		})
	})
}

/**
 * Either mark that a file has been signed with a content hash,
 * or add an etag with a content hash.
 */
function sendSigned(ctx, next) {
	//TODO
	ctx.signed = false;
	return next();
}

/**
 * A route configuration similar to koa-route Layers
 * @typedef {Object} Layer
 * @property {string|string[]} method - methods that this route accepts
 * @property {string} path - path for the route, parsed through path-to-regexp
 * @property {function|function[]} middleware - middleware used for this route
 * @property {Object} [opts] - options passed to koa-router
 * @property {string} [opts.name] - name of the route
 */
	
/**
 * Sets up routes that correspond to folders with static content:
 * /assets, /js, /css, and files in the root.
 * @type {Layer[]}
 */
module.exports = [
	{
		method: "GET",
		opts: {name: "static"},
		path: '/:sdir(assets|js|css)/*',
		middleware: [sendFile, sendSigned]
	},
	{
		method: "GET",
		opts: {name: "static_root"},
		path: '/:file.:ext',
		middleware: [
			/** Filter out requests for index.html */
			(ctx, next) => {
				if (
					ctx.params.file == 'index' &&
					(ctx.params.ext == 'html' || ctx.request.type.includes('html'))
				) {
					//TODO: respond with root instead of redirecting
					ctx.status = 301;
					ctx.redirect('/');
					ctx.body = '';
				} else {
					return next();
				}
			},
			/** Rewrite path for sendFile */
			(ctx, next) => {
				ctx.path = path.join('/root', ctx.path);
				return next();
			},
			sendFile
		]
	}
]