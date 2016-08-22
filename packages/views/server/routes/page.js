import { resolve, join, relative, extname } from 'path';
import { stat } from 'fs';
import { notFound } from 'boom';

function pageViews(pagename, path = pagename, context) {
	let moduleFolder;
	try {
		moduleFolder = require.resolve(`ubc-farm-page-${pagename}`);
	} catch (err) {
		// TODO: Make a better resolution algorithm
		// If no module found, check for a sibling package folder.
		moduleFolder = resolve(__dirname, `../page-${pagename}`);
	}

	// console.log(moduleFolder);
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

			const testPath = extname(filePath) ? filePath : `${filePath}.html`;

			stat(testPath, err => {
				if (err) {
					if (err.code !== 'ENOENT') throw err;
					return reply(notFound());
				}

				const rel = relative(__dirname, filePath);
				return reply.view(rel, context);
			});
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
