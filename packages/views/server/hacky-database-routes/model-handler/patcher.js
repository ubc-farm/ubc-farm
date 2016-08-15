import {transformReply} from './utils.js';

export default function patcher(route, options) {
	const Model = options.model;
	const routeMethod = route.method.toLowerCase();

	let method = 'AndFetchById'; 
	if (routeMethod === 'patch') method = 'patch' + method;
	else if (routeMethod === 'put') method = 'update' + method;
	else throw Error('patcher function set on a non PATCH/PUT route');

	return function(request, reply) {
		const {payload, params: {id, property}} = request;
		
		let query = Model.query();
		if (property) 
			query = query.patchAndFetchById(id, { [property]: payload })
		else 
			query = query[method](id, payload);

		return transformReply(query, request, reply);
	}
}