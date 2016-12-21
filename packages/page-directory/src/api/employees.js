import * as Joi from 'joi';
import db from '../pouchdb.js';
import Employee from '../schema/Employee.js';
import transfrom from '../schema/transform.js';
import { person } from '../schema/uris.js';

export const getEmployee = {
	method: 'GET',
	path: '/employees/{id}',
	handler({ params: { id } }, reply) {
		return reply(
			db.get(person({ role: 'employee', id }))
		).type('application/json');
	},
	config: { response: { schema: Employee } }
}

export const addEmployee = {
	method: 'POST',
	path: '/employees',
	handler({ payload }, reply) {
		return reply(db.put(transfrom(payload))).type('application/json');
	},
	config: { validate: { payload: Employee } }
}
