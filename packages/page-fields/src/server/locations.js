import { notFound, badRequest } from 'boom';
import { isFeatureCollection, isFeature, isPolygon } from 'geojson-validation';
import { FeatureCollection, Feature } from '../GeoJSON/index.js';
import knex from './knexinit.js';

function isFeatureWithId(feature, opts, done) {
	isFeature(feature, (bool, err) => {
		if (!bool) done(err);
		else if (typeof feature.id !== 'string') done(badRequest());
		else isPolygon(feature.geometry, (is, _err) => (is ? done() : done(_err)));
	});
}

export default [
	{
		method: 'GET',
		path: '/locations/{name?}',
		handler(request, reply) {
			const sqlRequest = knex
				.withSchema('fields')
				.select('name', 'geometry')
				.from('locations');
			let response;

			if (request.params.name) {
				response = sqlRequest.clone()
					.where('name', request.params.name)
					.then(([feature]) => {
						if (!feature) throw notFound();
						return new Feature(JSON.parse(feature.geometry), feature.name);
					});
			} else {
				response = sqlRequest.clone()
					.then(list => new FeatureCollection(list.map(({ name, geometry }) =>
						new Feature(JSON.parse(geometry), name),
					)));
			}

			return reply(response).type('application/json');
		},
		config: {
			response: {
				schema(value, { params }, done) {
					const callback = (is, err) => (is ? done() : done(err));
					if (params.name) isFeatureWithId(value, null, callback);
					else isFeatureCollection(value, callback);
				},
			},
			validate: {
				params({ name }, opts, done) {
					if (!name || typeof name === 'string' || typeof name === 'number') done();
					else done(`${name} is not string or number`);
				},
			},
		},
	},
	{
		method: 'POST',
		path: '/locations',
		handler(request, reply) {
			const { id: name, geometry } = request.payload;
			const sqlRequest = knex
				.withSchema('fields')
				.from('locations')
				.insert({ name, geometry: JSON.stringify(geometry) })
				.returning('name')
				.then(names => names[0]);
			return reply(sqlRequest);
		},
		config: {
			validate: { payload: isFeatureWithId },
		},
	},
	{
		method: 'PUT',
		path: '/locations',
		handler(request, reply) {
			const { id: name, geometry } = request.payload;
			const sqlRequest = knex
				.withSchema('fields')
				.from('locations')
				.where('name', name)
				.update({ geometry: JSON.stringify(geometry) })
				.then((updated) => {
					if (!updated) throw notFound();
					return name;
				});
			return reply(sqlRequest);
		},
		config: {
			validate: { payload: isFeatureWithId },
		},
	},
	{
		method: 'DELETE',
		path: '/locations/{name?}',
		handler({ payload, params }, reply) {
			const name = (payload && payload.name) || params.name;
			const sqlRequest = knex
				.withSchema('fields')
				.from('locations')
				.where('name', name)
				.delete()
				.then((deleted) => {
					if (!deleted) throw notFound();
					return name;
				});

			return reply(sqlRequest);
		},
	},
];
