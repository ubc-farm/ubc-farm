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

/**
 * @todo better resolution algorithm
 */
function javascriptRoute(pagename) {
	const pkg = require(`node_modules/ubc-farm-page-${pagename}/package.json`);
	const {browser: main = 'dist/index.iife.js'} = pkg;

	return [
		{
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
		},
		{
			method: 'GET',
			path: `/js/page/${pagename}/index.js`,
			handler: {
				file: `node_modules/ubc-farm-page-${pagename}/${main}`
			}
		}
	]
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