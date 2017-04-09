const { readdirSync } = require('fs');
const { resolve, basename } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const serverPath = resolve(__dirname, './packages/server');

/**
 * @param {string|Array<string>|object} entries
 * @param {string} dirname
 */
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

	const pkg = require(resolve(dirname, './package.json'));
	const externals = {};
	if (pkg.peerDependencies) {
		for (const packageName of Object.keys(pkg.peerDependencies)) {
			let data;
			switch (packageName) {
				case 'react':
					data = 'React';
					break;
				case 'react-dom':
					data = 'ReactDOM';
					break;
				default: data = packageName; break;
			}

			externals[packageName] = data;
		}
	}

	const plugins = [];
	for (const key of Object.keys(entry)) {
		plugins.push(new HtmlWebpackPlugin({
			filename: `./${key}.html`,
			template: resolve(__dirname, './packages/server/views/_page.ejs'),
			chunks: [key],
		}));
	}
	plugins.push(
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
		new webpack.BannerPlugin({ banner: '/* eslint-disable */', raw: true }),
		new ExtractTextPlugin('styles.css')
	);

	const config = {
		entry,
		plugins,
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					loader: 'ts-loader',
					options: {
						transpileOnly: true, // Editor handles typechecks
					},
				},
				{
					test: /\.(css)$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader',
					}),
				},
			],
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
			mainFields: ['browser', 'module', 'jsnext:main', 'main'],
		},
		devtool: 'source-map',
		output: {
			filename: '[name].js',
			path: resolve(dirname, 'www'),
		},
		context: dirname,
		externals,
		// watch: process.env.npm_config_watch,
	};

	return config;
};
