const { resolve } = require('path');

module.exports = {
	entry: './entry/index.ts',
	output: {
		filename: 'index.js',
		path: resolve(__dirname, 'browser'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true, // Editor handles typechecks
				},
			},
		],
	},
};
