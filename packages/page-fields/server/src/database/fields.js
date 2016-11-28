import * as Joi from 'joi';
import knex from '../connection.js';

const idSchema = Joi.alternatives().try(Joi.number(), Joi.string()).label('id');
const fieldSchema = Joi.object({
	id: idSchema,
	name: Joi.string(),
	path: Joi.object(),
	crops: Joi.array().items(Joi.string()),
	area: Joi.alternatives().try(Joi.string(), Joi.object()),
});

export const getField = {
	method: 'GET',
	path: '/fields/{id}',
	handler({ params: { id } }, reply) {
		const field = knex('fields')
			.where('id', id)
			.first()
			.join('area', 'fields.area', '=', 'area.name')
			.then(data => Object.assign(data, {
				path: JSON.parse(data.path),
				crops: JSON.parse(data.crops),
			}));

		return reply(field).type('application/json');
	},
	config: {
		response: { schema: fieldSchema },
	},
};

export const getFields = {
	method: 'GET',
	path: '/fields',
	handler(request, reply) {
		const fields = knex('fields')
			.select()
			.map(data => Object.assign(data, {
				path: JSON.parse(data.path),
				crops: JSON.parse(data.crops),
			}));

		return reply(fields).type('application/json');
	},
	config: {
		response: { schema: Joi.array().items(fieldSchema) },
	},
};

export const addField = {
	method: 'POST',
	path: '/fields/{id?}',
	handler({ params, payload }, reply) {
		const id = params.id || payload.id;

		const response = knex('fields')
			.insert(Object.assign({}, payload, {
				id,
				crops: JSON.stringify(payload.crops || []),
				path: payload.path ? JSON.stringify(payload.path) : undefined,
			}), 'id');

		return reply(response).type('application/json');
	},
	config: {
		validate: { payload: Joi.array().items(idSchema) },
	},
};

export const replaceField = {
	method: 'PUT',
	path: '/fields/{id?}',
	handler({ params, payload }, reply) {
		const id = params.id || payload.id;

		const response = knex('fields')
			.update(Object.assign({}, payload, {
				id,
				crops: JSON.stringify(payload.crops || []),
				path: payload.path ? JSON.stringify(payload.path) : undefined,
			}), 'id');

		return reply(response).type('application/json');
	},
	config: {
		validate: { payload: Joi.array().items(idSchema) },
	},
};

export const patchField = {
	method: 'PATCH',
	path: '/fields/{id?}',
	handler({ params, payload }, reply) {
		const id = params.id || payload.id;

		const patch = Object.assign({}, payload, { id });
		if (patch.crops) patch.crops = JSON.stringify(patch.crops);
		if (patch.path) patch.path = JSON.stringify(patch.path);

		const response = knex('fields').update(patch, 'id');
		return reply(response).type('application/json');
	},
	config: {
		validate: { payload: Joi.array().items(idSchema) },
	},
};

export const deleteField = {
	method: 'DELETE',
	path: '/fields/{id}',
	handler({ params: { id } }, reply) {
		const query = knex('area')
			.where('id', id)
			.delete()
			.then(() => id);

		return reply(query).type('application/json');
	},
};
