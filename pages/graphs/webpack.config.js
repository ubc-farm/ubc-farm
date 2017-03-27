const generateConfig = require('../../webpack.config.js');

module.exports = generateConfig({
	entry: {
		index: './entry/index.ts',
	},
}, __dirname);
