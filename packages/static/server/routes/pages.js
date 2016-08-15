function cssRoute(pagename) {
	return {
		method: 'GET',
		path: `/css/page/${pagename}/{param*}`,
		handler: {
			directory: {
				path: `node_modules/ubc-farm-page-${pagename}/styles`,
				listing: true,
				defaultExtension: 'css',
				index: false
			}
		}
	}
}

function javascriptRoute(pagename) {
	return {
		method: 'GET',
		path: `/js/page/${pagename}/{param*}`,
		handler: {
			directory: {
				path: `node_modules/ubc-farm-page-${pagename}/dist`,
				listing: true,
				defaultExtension: 'js',
				index: false
			}
		}
	}
}

const pageList = [
	'calendar',
	'directory',
	'fields',
	'invoice',
	'map-editor'
]

export default pageList.reduce(
	(routes = [], name) => [...routes, cssRoute(name), javascriptRoute(name)]
);