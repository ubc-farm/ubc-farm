const generateConfig = require('../../webpack.config.js');

module.exports = generateConfig({
	index: './entry/index.tsx',
}, __dirname);
