import * as Joi from 'joi';
import Equipment from '../schema/Equipment.js';
import transformInputToRow from '../schema/transform.js';
import db from '../pouchdb.js';

export const getInventory = {
	method: 'GET',
	path: '/inventory/{id?}',
	handler({ params: { id } }, reply) {
		return reply(id ? db.get(id) : db.allDocs()).type('application/json');
	},
	config: { response: { schema: Joi.array().single().items(Equipment) } },
};

export const setInventory = {
	method: ['POST', 'PUT', 'PATCH'],
	path: '/inventory',
	handler({ payload }, reply) {
		const newRow = transformInputToRow(payload);
		return reply(db.put(newRow)).type('application/json');
	},
	config: {
		validate: { payload: Equipment },
	},
};
