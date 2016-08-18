import {join} from 'path';
import __dirname from '../../dirname.js'
import search from '../find-folder.js';

function cssRoute(pagename, folder) {
	return {
		method: 'GET',
		path: `/css/page/${pagename}/{param*}`,
		handler: {
			directory: {
				path: join(folder, 'styles'),
				listing: true,
				defaultExtension: 'css',
				index: false
			}
		}
	}
}

function javascriptRoute(pagename, folder) {
	//eslint-disable-next-line global-require
	const pkg = require(join(folder, 'package.json')); 
	const {browser: main = 'dist/index.iife.js'} = pkg;

	return [
		{
			method: 'GET',
			path: `/js/page/${pagename}/{param*}`,
			handler: {
				directory: {
					path: join(folder, 'dist'),
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
				file: {
					path: join(folder, main),
					confine: false
				}
			}
		}
	]
}

const folder = join(__dirname, 'node_modules');
function searchForRouteFolders(pagename) {
	return search(folder, `ubc-farm-page-${pagename}`, `page-${pagename}`)
		.then(path => {
			if (path === undefined) throw new Error(`${pagename} not found`);
			else return [...javascriptRoute(pagename, path), cssRoute(pagename, path)]
		});
}

const pageList = [
	'calendar',
	'directory',
	'fields',
	'invoice',
	'map-editor'
]

const routes = Promise.all(pageList.map(searchForRouteFolders))

export default routes.then(routes => routes.reduce(
	(allRoutes = [], additional) => [...allRoutes, ...additional]
));