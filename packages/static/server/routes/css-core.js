import { resolve } from 'path';
import __dirname from '../../dirname.js';
import search from '../find-folder.js';

const cssCoreSearch = search(__dirname, 'node_modules/ubc-farm-css').then(path => {
	if (path === undefined) throw new Error('Could not find css-core package');
	return path;
});

export default cssCoreSearch.then(cssCore => {
	const core = {
		method: 'GET',
		path: '/css/core/{param*}',
		handler: {
			directory: {
				path: resolve(cssCore, '../src'),
				listing: true,
				defaultExtension: 'css',
				index: false,
			},
		},
	};

	const coreMin = {
		method: 'GET',
		path: '/css/core/min.css',
		handler: {
			file: resolve(cssCore, '../min.css'),
		},
	};

	const coreIndex = Object.assign({}, coreMin, {
		path: '/css/core/index.css',
	});

	return [core, coreMin, coreIndex];
});
