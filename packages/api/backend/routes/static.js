let router = require('koa-router')();
const send = require('koa-send');
const fs = require('fs');
const path = require('path').posix;
const Promise = require('bluebird');

const staticDir = process.env.WWW_STATIC || 'static';
//const hashRegexp = /.*-\w{10}\..*/g;

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
					res.set('Cache-Control', 'max-age=31536000');
				} else {
					res.set('Cache-Control', 'no-cache');
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
}

router.get('/:sdir(assets|js|css)', sendFile, sendSigned);

router.get('/:file.:ext', 
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
	sendFile)
	
	module.exports = router;