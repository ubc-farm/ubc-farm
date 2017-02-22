/* eslint-disable import/newline-after-import */
const denodeify = require('denodeify');
const outputFile = denodeify(require('fs-extra').outputFile);
const { join } = require('path');
const compileFile = require('./compileFile.js');

/**
 * @param {string} file path
 * @param {Object} options
 * @param {string} options.cwd - directory to use as root for the path
 * @returns {Promise<void>}
 */
module.exports = async function copyFile(file, options) {
	const { cwd } = options;
	const _site = join(cwd, '_site');

	const [dest, output] = await compileFile(file, options);
	await outputFile(join(_site, dest), output);
};
