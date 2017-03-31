const generateConfig = require('../../webpack.config.js');

module.exports = generateConfig({
	index: './src/index.js',
}, __dirname);
