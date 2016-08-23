export default {
	method: 'GET',
	path: '/css/partials/{param}',
	handler: {
		directory: {
			path: 'node_modules/ubc-farm-views-utils/partials/css',
			listing: true,
			defaultExtension: 'css',
			index: false,
		},
	},
};
