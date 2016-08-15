export const tableBase = {
	method: 'GET',
	path: '/css/module/table-base/{param*}',
	handler: {
		directory: {
			path: 'node_modules/ubc-farm-table-base/styles',
			listing: true,
			defaultExtension: 'css',
			index: false
		}
	}
}
