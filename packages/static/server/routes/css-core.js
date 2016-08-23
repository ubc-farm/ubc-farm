export const core = {
	method: 'GET',
	path: '/css/core/{param*}',
	handler: {
		directory: {
			path: 'node_modules/ubc-farm-css/src',
			listing: true,
			defaultExtension: 'css',
			index: false,
		},
	},
};

export const coreMin = {
	method: 'GET',
	path: '/css/core/min.css',
	handler: {
		file: 'node_modules/ubc-farm-css/min.css',
	},
};

export const coreIndex = Object.assign({}, coreMin, {
	path: '/css/core/index.css',
});

export default [core, coreMin, coreIndex];
