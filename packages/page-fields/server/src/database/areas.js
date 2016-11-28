import { snakeCase } from 'lodash';
import { isPolygon } from 'geojson-validation';
import knex from '../connection.js';

function validateGeometry(value, opts, done) {
	if (Array.isArray(value)) {
		if (opts.params.name) {
			done('Cannot specify name when using array');
			return;
		}

		const errors = [];
		value.forEach(item => isPolygon(item.geometry, (is, err) => {
			if (!is) errors.push(err);
		}));

		if (errors.length === 0) done(); else done(errors);
	} else {
		isPolygon(value.geometry, (is, err) => (is ? done() : done(err)));
	}
}

export const getArea = {
	method: 'GET',
	path: '/areas/{name}',
	handler({ params: { name } }, reply) {
		const item = knex('area')
			.where('name', snakeCase(name)).first()
			.then(i => Object.assign(i, {
				geometry: JSON.parse(i.geometry),
			}));

		return reply(item).type('application/json');
	},
	config: {
		response: { schema(value, opts, done) {
			if (value.name !== snakeCase(opts.params.name)) {
				done("Name doesn't match request");
			} else {
				validateGeometry(value, opts, done);
			}
		} },
		validate: { params({ name }, opts, done) {
			if (snakeCase(name)) done();
			else done('Name is invalid');
		} },
	},
};

export const getAllAreas = {
	method: 'GET',
	path: '/areas',
	handler(request, reply) {
		const items = knex('area')
			.map(i => Object.assign(i, {
				geometry: JSON.parse(i.geometry),
			}));

		return reply(items).type('application/json');
	},
	config: {
		response: { schema: validateGeometry },
	},
};

export const addArea = {
	method: 'POST',
	path: '/areas/{name?}',
	handler({ params, payload }, reply) {
		const name = snakeCase(params.name || payload.name);
		const geometry = JSON.stringify(payload.geometry);

		const query = knex('area')
			.insert({ name, geometry }, 'name');

		return reply(query).type('application/json');
	},
	config: {
		validate: { payload: validateGeometry },
	},
};

export const updateArea = {
	method: ['PUT', 'PATCH'],
	path: '/areas/{name?}',
	handler({ params, payload }, reply) {
		const name = snakeCase(params.name || payload.name);
		const geometry = JSON.stringify(payload.geometry);

		const query = knex('area')
			.update({ name, geometry }, 'name');

		return reply(query).type('application/json');
	},
	config: {
		validate: { payload: validateGeometry },
	},
};

export const deleteArea = {
	method: 'DELETE',
	path: '/areas/{name}',
	handler({ params }, reply) {
		const name = snakeCase(params.name);

		const query = knex('area')
			.where('name', name)
			.delete()
			.then(() => name);

		return reply(query).type('application/json');
	},
};
