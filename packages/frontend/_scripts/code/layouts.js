/* eslint-disable import/newline-after-import,no-console */
const promisify = require('promisify-node');
const { readFile, readdir } = promisify('fs');
const { join, parse } = require('path');
const Handlebars = require('handlebars');

const layouts = new Map();

function prepareLayout(file) {
	const filepath = join('./_layouts', file);
	const { name } = parse(file);

	return readFile(filepath, 'utf8').then(text => layouts.set(name, text));
}

exports.prepareLayouts = function prepareLayouts() {
	return readdir('./_layouts').then(files =>
		Promise.all(files.map(prepareLayout)));
}

/**
 * @param {string|Handlebars.template} html
 * @param {string} [layoutName=default]
 * @param {Object} [context]
 * @returns {string}
 */
exports.useLayout = function useLayout(html, layoutName = 'default', context) {
	if (layouts.size === 0) {
		console.warn('No layouts have been loaded');
	}

	Handlebars.registerPartial('body', html);

	const output = Handlebars.compile(layouts.get(layoutName), { noEscape: true })(context);
	Handlebars.registerPartial('body', '');
	return output;
}
