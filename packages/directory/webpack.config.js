const generateConfig = require('../../webpack.config.js')

module.exports = generateConfig({
	entry: {
		index: './entry/index.ts',
		new: './entry/new.ts',
	},
}, __dirname);
