const generateConfig = require('../../webpack.config.js');

module.exports = generateConfig({
	entry: {
		index: './src/index.js',
	},
}, __dirname);
