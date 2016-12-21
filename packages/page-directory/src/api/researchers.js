import * as Joi from 'joi';
import Researcher from '../schema/Researcher.js';
import transfrom from '../schema/transform.js';
import { person } from '../schema/uris.js';

export const getResearcher = {
	method: 'GET',
	path: '/researchers/{id}',
	handler({ params: { id } }, reply) {
		return reply(
			db.get(person({ role: 'researcher', id }))
		).type('application/json');
	},
	config: { response: { schema: Researcher } }
}

export const addResearcher = {
	method: 'POST',
	path: '/researchers',
	handler({ payload }, reply) {
		return reply(db.put(transfrom(payload))).type('application/json');
	},
	config: { validate: { payload: Researcher } }
}
