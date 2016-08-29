import { join, relative, extname } from 'path';
import { notFound } from 'boom';
import search, { doesPathExist } from '../find-folder.js';

const start = join(__dirname, 'node_modules');
function pageViews(pagename, path = pagename, context) {
	return search(start, `ubc-farm-page-${pagename}`, `page-${pagename}`)
	.then(moduleFolder => ({
		method: 'GET',
		path: `/${path}/{param*}`,
		handler: function viewHandler(request, reply) {
			const reqPath = request.params.param || 'index';
			const filePath = join(moduleFolder, 'views', reqPath);

			const testPath = extname(filePath) ? filePath : `${filePath}.html`;
			return doesPathExist(testPath).then(exists => {
				if (!exists) return reply(notFound());

				const rel = relative(__dirname, filePath);
				return reply.view(rel, context);
			});
		},
	}));
}

export default Promise.all([
	pageViews('calendar'),
	pageViews('directory'),
	pageViews('fields'),
	pageViews('invoice', 'finances/sales'),
	pageViews('map-editor', 'fields/editor'),
	pageViews('add-items', 'finances/add-item'),
	pageViews('planner', 'calendar/planner'),
]);
