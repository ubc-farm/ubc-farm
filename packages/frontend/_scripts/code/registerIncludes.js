/* eslint-disable import/newline-after-import */
const denodeify = require('denodeify');
const readFile = denodeify(require('fs').readFile);
const { join, parse } = require('path');
const Handlebars = require('handlebars');
const searchFolder = require('./searchFolder.js');

/**
 * Sets the include at the given path as a partial
 * @param {string} file
 */
async function registerInclude(file, { cwd }) {
	const filepath = join(cwd, file);
	const { name } = parse(file);

	const text = await readFile(filepath, 'utf8');
	Handlebars.registerPartial(name, text);
}

module.exports = function registerIncludes(options) {
	return searchFolder('_includes', registerInclude, options);
};
