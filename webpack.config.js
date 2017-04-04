const { readdirSync } = require('fs');
const { resolve, basename } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

	const config = {
		entry,
		plugins: Object.keys(entry).map(key => new HtmlWebpackPlugin({
			filename: `./${key}.html`,
			// template: './packages/server/views/_page.hbs',
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
				/*{
					test: /\.(hbs|handlebars)$/,
					loader: 'handlebars-loader',
					options: {
						runtime: resolve(serverPath, './node_modules/handlebars/runtime.js'),
						helperDirs: [
							resolve(serverPath, './node_modules/handlebars-helpers/lib'),
						],
						partialDirs: [
							resolve(serverPath, './views/_partials'),
						],
					},
				},*/
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
