import {transformReply} from './utils.js';

export default function poster(route, options) {
	const Model = options.model;
	return function(request, reply) {
		const {payload} = request;

		const query = Model.query()
			.insert(payload)
			.then(inserted => ({ id: inserted[Model.idColumn] }));

		return transformReply(query, request, reply);
	};
}