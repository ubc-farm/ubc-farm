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
			const requestedPath = request.params.param || 'index';
			const fileLocation = join(moduleFolder, 'views', requestedPath);

			const pathsToVerify = extname(fileLocation)
				? [fileLocation]
				: [`${fileLocation}.hbs`, `${fileLocation}.html`];

			return Promise.all(pathsToVerify.map(doesPathExist)).then(exists => {
				for (const [index, file] of pathsToVerify.entries()) {
					if (exists[index]) {
						const rel = relative(__dirname, file);
						return reply.view(rel, context);
					}
				}

				return reply(notFound());
			});
		},
	}));
}

export default Promise.all([
	pageViews('calendar'),
	pageViews('directory'),
	pageViews('fields'),
	pageViews('invoice', 'finances/sales', {
		breadcrumbs: [
			{ title: 'Finances', href: '/finances' },
			{ title: 'Sales', href: '#' },
		],
	}),
	pageViews('map-editor', 'fields/editor', {
		breadcrumbs: [
			{ title: 'Fields', href: '/fields' },
			{ title: 'Editor', href: '#' },
		],
	}),
	pageViews('add-items', 'finances/items/add', {
		breadcrumbs: [
			{ title: 'Finances', href: '/finances' },
			{ title: 'Items', href: '/items' },
			{ title: 'Add', href: '#' },
		],
	}),
	pageViews('planner', 'calendar/planner', {
		breadcrumbs: [
			{ title: 'Calendar', href: '/calendar' },
			{ title: 'Planner', href: '#' },
		],
	}),
]);
