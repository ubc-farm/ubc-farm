import { notFound } from 'boom';
import knex from './knexinit.js';

export default {
	method: 'GET',
	path: '/locations/{name}/image',
	handler(request, reply) {
		const sqlRequest = knex
			.withSchema('fields')
			.select('geometry')
			.where('name', request.params.name)
			.from('locations')
			.then(([feature]) => {
				if (!feature) throw notFound();
				return JSON.parse(feature.geometry).coordinates;
			});
	},
};
