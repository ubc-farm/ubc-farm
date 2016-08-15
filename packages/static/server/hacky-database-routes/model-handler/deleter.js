export default function deleter(route, options) {
	const Model = options.model;
	return function(request, reply) {
		const {params: {id, property}} = request;
		
		let query = Model.query();
		if (property) 
			query = query.patchAndFetchById(id, { [property]: null })
		else 
			query = query.deleteById(id);
		
		return reply(query);
	};
}