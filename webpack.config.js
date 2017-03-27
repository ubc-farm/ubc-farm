const { readdirSync } = require('fs');
const { resolve, basename } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function generateWebpackConfig(entries, dirname) {
	let entry = {};
	if (typeof entries === 'string') {
		const folder = entries;
		const path = resolve(dirname, folder);
		entries = readdirSync(path).map(file => resolve(folder, file));
	}

	if (Array.isArray(entries)) {
		entries.forEach((path) => { entry[basename(path)] = path; });
	} else if (typeof entries === 'object') {
		entry = entries;
	}

	const config = {
		entry,
		plugins: Object.keys(entry).map(key => new HtmlWebpackPlugin({
			filename: `./www/${key}.html`,
			// template: '',
			chunks: [key],
		})),
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
	};

	return config;
};
