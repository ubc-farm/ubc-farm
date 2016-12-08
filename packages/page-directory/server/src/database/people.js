import * as Joi from 'joi';

const personSchema = Joi.object({
	id: Joi.number(),
	role: Joi.string(),
	email: Joi.string().email(),
	phoneNumber: Joi.string(),
	addressMailing: Joi.object(),
	addressPhysical: Joi.object(),
});

export const getPeople = {
	method: 'GET',
	path: '/people',
	handler: (request, reply) => reply.knex(async (knex) => {
		const people = await knex('people').select();
		return people.map(person => Object.assign(person, {
			addressMailing: JSON.parse(person.addressMailing),
			addressPhysical: JSON.parse(person.addressPhysical),
		}));
	}).type('application/json'),
	config: {
		response: { schema: Joi.array().items(personSchema) },
	},
};

export const getPerson = {
	method: 'GET',
	path: '/people/{id}',
	handler: ({ params: { id } }, reply) => reply.knex(knex =>
		knex('people')
			.where('id', id)
			.first()
			.then(person => Object.assign(person, {
				addressMailing: JSON.parse(person.addressMailing),
				addressPhysical: JSON.parse(person.addressPhysical),
			})),
	).type('application/json'),
	config: {
		response: { schema: personSchema },
	},
};

export const addPerson = {
	method: 'POST',
	path: '/people/{id?}',
	handler: ({ params, payload }, reply) => reply.knex(knex =>
		knex('people')
			.insert(Object.assign({}, payload, {
				id: params.id || payload.id,
				addressMailing: JSON.stringify(payload.addressMailing),
				addressPhysical: JSON.stringify(payload.addressPhysical),
			}), 'id'),
	).type('application/json'),
	config: {
		validate: { payload: personSchema },
	},
};
