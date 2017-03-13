const { resolve } = require('path');

module.exports = function generateWebpackConfig(extension, dirname) {
	return Object.assign({
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
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		},
		devtool: 'source-map',
		output: {
			filename: '[name].js',
			path: resolve(dirname, 'browser'),
		},
		context: dirname,
		// watch: process.env.npm_config_watch,
	}, extension);
};
