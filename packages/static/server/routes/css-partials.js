import { resolve } from 'path';

const viewsUtils = require.resolve('ubc-farm-views-utils');

export default {
	method: 'GET',
	path: '/css/partials/{param}',
	handler: {
		directory: {
			path: resolve(viewsUtils, '../partials/css'),
			listing: true,
			defaultExtension: 'css',
			index: false,
		},
	},
};
