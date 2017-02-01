/* eslint-disable import/newline-after-import */
const promisify = require('promisify-node');
const { readFile, readdir } = promisify('fs');
const { join, parse } = require('path');
const Handlebars = require('handlebars');

function registerInclude(file) {
	const filepath = join('./_includes', file);
	const { name } = parse(file);

	return readFile(filepath, 'utf8').then(text =>
		Handlebars.registerPartial(name, text));
}

module.exports = function reigsterIncludes() {
	return readdir('./_includes').then(files =>
		Promise.all(files.map(registerInclude)));
}
