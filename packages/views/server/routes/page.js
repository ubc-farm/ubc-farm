import { resolve, join, relative } from 'path';

function pageViews(pagename, path = pagename, context) {
	let moduleFolder;
	try {
		moduleFolder = require.resolve(`ubc-farm-page-${pagename}`);
	} catch (err) {
		// TODO: Make a better resolution algorithm
		// If no module found, check for a sibling package folder.
		moduleFolder = resolve(__dirname, `../page-${pagename}`);
	}

	console.log(moduleFolder);
	return {
		method: 'GET',
		path: `/${path}/{param*}`,
		handler(request, reply) {
			const reqPath = request.params.param;

			let filePath;
			if (reqPath) {
				filePath = join(moduleFolder, 'views', reqPath);
			} else {
				// get index
				filePath = join(moduleFolder, 'views', 'index');
			}
			filePath = relative(__dirname, filePath);

			reply.view(filePath, context);
		},
	};
}

export default [
	pageViews('calendar'),
	pageViews('directory'),
	pageViews('fields'),
	pageViews('invoice', 'finances/sales'),
	pageViews('map-editor', 'fields/editor'),
	pageViews('add-items', 'finances/add-item'),
	pageViews('planner', 'calendar/planner'),
];
