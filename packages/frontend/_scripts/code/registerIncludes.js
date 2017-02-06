/* eslint-disable import/newline-after-import */
const promisify = require('promisify-node');
const { readFile } = promisify('fs');
const { join, parse } = require('path');
const Handlebars = require('handlebars');
const searchFolder = require('./searchFolder.js');

function registerInclude(file, { cwd }) {
	const filepath = join(cwd, file);
	const { name } = parse(file);

	return readFile(filepath, 'utf8').then(text =>
		Handlebars.registerPartial(name, text));
}

module.exports = function registerIncludes(options) {
	return searchFolder('_includes', registerInclude, options);
};
