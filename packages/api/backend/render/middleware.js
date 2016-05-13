const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

const renderer = require('./');

const viewDir = '../../views';

/**
 * Checks if directory contains the file
 * @param {string} dir - path to directory
 * @param {string|string[]} filename - name of file, or array of possible files
 * @returns {Promise<boolean>} wheter or not the file(s) are present
 */
function dirContains(dir, filename) {
	if (typeof filename == 'string') filename = [filename];
	
	return fs.readdirAsync(dir).then(list => {
		return filename.some(v => list.indexOf(v) > -1);
	})
}

/**
 * Streams out a marko template as body if the path matches a view directory 
 * that contains a index.marko file.
 */
module.exports = (ctx, next) => {
	let dir = path.join(viewDir, ctx.path);
	if (dirContains(dir, ['index.marko', 'index.marko.js'])) {
		return next().then(() => {
			ctx.type = 'text/html';
			ctx.body = renderer.stream(path.join(dir, 'index.marko'));
		})
	} else {
		return next();
	}
}