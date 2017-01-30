const promisify = require('promisify-node');
const glob = promisify('glob');
const handlebars = require('handlebars');
require('handlebars-helpers')({ handlebars });
require('./resolveHelper.js')({ handlebars });
const loadData = require('./loadData.js');
const registerIncludes = require('./registerIncludes.js');
const copyFile = require('./copyFile.js');
const { prepareLayouts } = require('./layouts.js');

Promise.all([
	glob('**/*', { ignore: ['node_modules/**', '_*/**'] }),
	loadData(),
	registerIncludes(),
	prepareLayouts(),
]).then(([files, data]) =>
	Promise.all(files.map(file => copyFile(file, { data })))
).catch((err) => {
	console.error(err);
});
