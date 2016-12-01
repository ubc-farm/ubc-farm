import * as Joi from 'joi';

export const getPerson = {
	method: 'GET',
	path: '/people/{id}',
	handler: ({ params: { id } }, reply) => reply(
		knex('people')
			.where('id', id)
			.first()
			.then(person => Object.assign(person, {
				addressMailing: JSON.parse(person.addressMailing),
				addressPhysical: JSON.parse(person.addressPhysical),
			}))
	).type('application/json'),
};

export const addPerson = {
	method: 'POST',
	path: '/people/{id?}',
	handler: ({ params, payload }, reply) => reply(
		knex('people')
			.where('id', id)
			.insert(Object.assign({}, payload, {
				id: params.id || payload.id,
				addressMailing: JSON.stringify(payload.addressMailing),
				addressPhysical: JSON.stringify(payload.addressPhysical),
			}), 'id')
	).type('application/json'),
};
