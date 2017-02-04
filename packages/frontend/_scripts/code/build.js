/* eslint-disable import/newline-after-import,no-console */
const promisify = require('promisify-node');
const glob = promisify('glob');
const handlebars = require('handlebars');
require('handlebars-helpers')({ handlebars });
require('./resolveHelper.js')({ handlebars });
const loadData = require('./loadData.js');
const registerIncludes = require('./registerIncludes.js');
const copyFile = require('./copyFile.js');
const scriptFolder = require('./scriptFolder.js');
const { prepareLayouts } = require('./layouts.js');

module.exports = Promise.all([
	glob('**/*', { ignore: ['node_modules/**', '_*/**'] }),
	loadData(),
	registerIncludes(),
	prepareLayouts(),
	scriptFolder(),
]).then(([files, data]) =>
	Promise.all(files.map(file => copyFile(file, { data })))
);
