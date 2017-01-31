const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

/**
 * Checks if directory contains the file
 * @param {string} dir - path to directory
 * @param {string|string[]} filename - name of file, or array of possible files
 * @returns {Promise<boolean>} wheter or not the file(s) are present
 */
exports.contains = function(dir, filename) {
	if (typeof filename == 'string') filename = [filename];
	
	return fs.readdirAsync(dir).then(list => {
		return filename.some(v => list.indexOf(v) > -1);
	})
}

/**
 * Lists immediate subdirectories of dir
 * @param {string} dir - path to directory
 * @returns {Promise<string[]>} names of subdirectories
 */
exports.list = function(dir) {
	return fs.readdirAsync(dir).filter(name => {
		return fs.statAsync(path.join(dir, name))
			.then(stat => stat.isDirectory())
			.catch(() => false)
	})
}