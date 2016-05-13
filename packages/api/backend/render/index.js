const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

const renderer = require('./helper.js');
const folder = require('./folder.js')

const viewDir = '../../views';

/**
 * Streams out a marko template as body if the path matches a view directory 
 * that contains a index.marko file.
 */
module.exports = (ctx, next) => {
	let dir = path.join(viewDir, ctx.path);
	if (folder.contains(dir, ['index.marko', 'index.marko.js'])) {
		return next().then(() => {
			ctx.type = 'text/html';
			ctx.body = renderer.stream(path.join(dir, 'index.marko'));
		});
	} else {
		ctx.status = 404;
		ctx.body = ctx.message;
	}
}