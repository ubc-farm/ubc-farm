import { resolve } from 'path';

const viewsPartials = require.resolve('ubc-farm-views-partials');

export default {
	method: 'GET',
	path: '/css/partials/{param}',
	handler: {
		directory: {
			path: resolve(viewsPartials, '../partials/css'),
			listing: true,
			defaultExtension: 'css',
			index: false,
		},
	},
};
