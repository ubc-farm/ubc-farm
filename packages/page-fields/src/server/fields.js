import * as Joi from 'joi';
import { notFound } from 'boom';
import { geometry as getArea } from 'geojson-area';
import { isPolygon } from 'geojson-validation';
import knex from './knexinit.js';

const squareMeterToAcres = sqMeters => sqMeters * 0.00024711;

function transformSqlToResponse({ id, location, path, name, crops }) {
	const result = { id, location };

	if (path) {
		const sqM = getArea(JSON.parse(path));
		result.area = Math.round(squareMeterToAcres(sqM));
	}

	result.name = name || '';
	result.crops = JSON.parse(crops);

	return result;
}

const schema = Joi.object().keys({
	id: Joi.string(),
	location: Joi.string(),
	name: Joi.string(),
	crops: Joi.array().items(Joi.string()),
	area: Joi.number().integer().allow(null),
});

function validatePayload(value, opts, done) {
	Joi.validate(value, {
		id: Joi.string().optional(),
		location: Joi.string(),
		name: Joi.string().optional(),
		crops: Joi.array().items(Joi.string()).optional(),
		path: Joi.object().optional(),
	}, (errs, result) => {
		if (errs) done(errs);
		else if (result.path) {
			isPolygon(result.path, (is, err) => (is ? done() : done(err)));
		} else {
			done();
		}
	});
}

export default [
	{
		method: 'GET',
		path: '/fields/{id}',
		handler({ params: { id: wantedId } }, reply) {
			const response = knex
				.withSchema('fields')
				.select('id', 'location', 'path', 'name', 'crops')
				.where('id', wantedId)
				.from('fields')
				.then(([field]) => transformSqlToResponse(field));

			return reply(response).type('application/json');
		},
		config: {
			response: { schema },
		},
	},
	{
		method: 'GET',
		path: '/fields',
		handler({ params: { id: wantedId } }, reply) {
			const response = knex
				.withSchema('fields')
				.select('id', 'location', 'path', 'name', 'crops')
				.from('fields')
				.map(transformSqlToResponse);

			return reply(response).type('application/json');
		},
		config: {
			response: { schema: Joi.array().items(schema) },
		},
	},
	{
		method: 'POST',
		path: '/fields',
		handler(request, reply) {
			const { id, location, name, crops, path } = request.payload;

			const response = knex
				.withSchema('fields')
				.insert({
					id,
					location,
					name,
					crops: JSON.stringify(crops || []),
					path: path ? JSON.stringify(path) : undefined,
				})
				.from('fields')
				.returning('id')
				.then(ids => ids[0]);

			return reply(response);
		},
		config: {
			validate: { payload: validatePayload },
		},
	},
	{
		method: 'PUT',
		path: '/fields/{id?}',
		handler(request, reply) {
			const { id, location, name, crops, path } = request.payload;
			const response = knex
				.withSchema('fields')
				.where('id', id || request.params.id)
				.update({
					location,
					name,
					crops: JSON.stringify(crops || []),
					path: path ? JSON.stringify(path) : undefined,
				})
				.from('fields')
				.then((updated) => {
					if (!updated) throw notFound();
					return id;
				});

			return reply(response);
		},
		config: {
			validate: {
				payload: validatePayload,
				params: { id: Joi.string() },
			},
		},
	},
];
