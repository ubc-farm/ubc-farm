function pageViews(pagename, path = pagename, context) {
	return {
		method: 'GET',
		path: `/${path}/{param*}`,
		handler(request, reply) {
			const reqPath = request.params.param;
			reply.view(`node_modules/ubc-farm-page-${pagename}/${reqPath}`, context);
		}
	}
}

export default [
	pageViews('calendar'),
	pageViews('directory'),
	pageViews('fields'),
	pageViews('invoice',    'finance/sales'),
	pageViews('map-editor', 'fields/editor'),
	pageViews('planner'),
];