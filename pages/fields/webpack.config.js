const generateConfig = require('../../webpack.config.js');

module.exports = generateConfig({
	entry: {
		edit: './entry/edit.ts',
		index: './entry/index.ts',
		new: './entry/new.ts',
	},
}, __dirname);
