/* eslint-disable import/newline-after-import,no-console */
const promisify = require('promisify-node');
const glob = promisify('glob');
const handlebars = require('handlebars');
require('handlebars-helpers')({ handlebars });
const loadData = require('./loadData.js');
const registerIncludes = require('./registerIncludes.js');
const copyFile = require('./copyFile.js');
const scriptFolder = require('./scriptFolder.js');
const { prepareLayouts } = require('./layouts.js');

module.exports = function build(cwd) {
	const opts = { cwd, nodir: true };

	return Promise.all([
		glob('**/*',
			Object.assign({}, opts, { ignore: ['node_modules/**', '_*/**'] })),
		loadData(opts),
		registerIncludes(opts),
		prepareLayouts(opts),
		scriptFolder(opts),
	]).then(([files, data]) => {
		const options = Object.assign({}, opts, { context: { data } });
		const copies = files.map(file => copyFile(file, options));
		return Promise.all(copies);
	}).then(() => {});
};
