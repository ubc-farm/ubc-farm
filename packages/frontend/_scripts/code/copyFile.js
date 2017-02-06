/* eslint-disable import/newline-after-import */
const promisify = require('promisify-node');
const { stat, outputFile } = promisify('fs-extra');
const { join } = require('path');
const compileFile = require('./compileFile.js');

/**
 * @param {string} file path
 * @param {Object} options
 * @param {string} options.cwd - directory to use as root for the path
 * @returns {Promise<void>}
 */
module.exports = function copyFile(file, options) {
	const { cwd } = options;
	const _site = join(cwd, '_site');

	return compileFile(file, options)
		.then(([dest, output]) => outputFile(join(_site, dest), output))
};
