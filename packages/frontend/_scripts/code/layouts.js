/* eslint-disable import/newline-after-import,no-console */
const denodeify = require('denodeify');
const readFile = denodeify(require('fs').readFile);
const { join, parse } = require('path');
const Handlebars = require('handlebars');
const searchFolder = require('./searchFolder.js');

const layouts = new Map();

function prepareLayout(file, { cwd }) {
	const filepath = join(cwd, file);
	const { name } = parse(file);

	return readFile(filepath, 'utf8').then(text => layouts.set(name, text));
}

exports.prepareLayouts = function prepareLayouts(options) {
	return searchFolder('_layouts', prepareLayout, options);
}

/**
 * @param {string|Handlebars.template} html
 * @param {string} [layoutName=default]
 * @param {Object} [context]
 * @returns {string}
 */
exports.useLayout = function useLayout(html, layoutName = 'default', context) {
	if (!layouts.has(layoutName)) {
		throw new Error(`${layoutName} not loaded`);
	}

	Handlebars.registerPartial('body', html);

	const output = Handlebars.compile(layouts.get(layoutName), { noEscape: true })(context);
	Handlebars.registerPartial('body', '');
	return output;
}
