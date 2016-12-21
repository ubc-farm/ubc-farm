import * as Joi from 'joi';
import Person from '../schema/Person.js';
import transfrom from '../schema/transform.js';

export const getPeople = {
	method: 'GET',
	path: '/people',
	handler(request, reply) {
		return reply(db.allDocs()).type('application/json');
	},
	config: { response: { schema: Joi.array().items(Person) } }
}

export const getPerson = {
	method: 'GET',
	path: '/people/{id}',
	handler({ params: { id } }, reply) {
		return reply(db.get(`person/${id}`)).type('application/json');
	},
	config: { response: { schema: Person } }
}

export const addPerson = {
	method: 'POST',
	path: '/people',
	handler({ payload }, reply) {
		return reply(db.put(transfrom(payload))).type('application/json');
	},
	config: { validate: { payload: Person } }
}
