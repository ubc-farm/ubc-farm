/* eslint-disable import/newline-after-import,no-console */
const denodeify = require('denodeify');
const glob = denodeify(require('glob'));
const handlebars = require('handlebars');
require('handlebars-helpers')({ handlebars });
const loadData = require('./loadData.js');
const registerIncludes = require('./registerIncludes.js');
const copyFile = require('./copyFile.js');
const scriptFolder = require('./scriptFolder.js');
const { prepareLayouts } = require('./layouts.js');

module.exports = async function build(cwd, extraData) {
	const opts = { cwd, nodir: true };
	console.log(cwd);

	const [files, dataFiles] = await Promise.all([
		glob('**/*', Object.assign({}, opts, { ignore: ['node_modules/**', '_*/**'] })),
		loadData(opts),
		registerIncludes(opts),
		prepareLayouts(opts),
		scriptFolder(opts),
	]);

	const options = Object.assign({}, opts, {
		context: {
			data: Object.assign({}, dataFiles, extraData),
		}
	});

	await Promise.all(
		files.map(file => copyFile(file, options))
	);
};
