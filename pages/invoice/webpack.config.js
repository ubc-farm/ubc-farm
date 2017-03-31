const generateConfig = require('../../webpack.config.js');

module.exports = generateConfig({
	index: './entry/index.ts',
}, __dirname);
