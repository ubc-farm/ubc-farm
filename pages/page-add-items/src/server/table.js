import { unparse } from 'babyparse';
import schema from './validate.js';

export const fields = [
	'id',
	'class',
	'product',
	'description',
	'quantity',
	'unit',
	'valuePerUnit',
	'entryDate',
	'lifeSpan',
	'location',
	'salvageValue',
	'barcode',
	'supplier',
	'sku',
];

export default [
	{
		method: 'GET',
		path: '/table/headers',
		handler(request, reply) {
			const response = request.query.reverse != null
				? fields.reduce((obj, field, i) => { obj[field] = i; return obj; }, {})
				: fields.reduce((obj, field, i) => { obj[i] = field; return obj; }, {});

			return reply(response).type('application/json');
		},
	},
	{
		method: 'GET',
		path: '/json',
		handler(request, reply) {

		},
		config: {
			response: { schema },
		},
	},
	{
		method: 'GET',
		path: '/table',
		handler(request, reply) {
			// TODO get data
			return reply(unparse(data, { newline: '\n' })).type('text/csv');
		},
	},
	{
		method: 'POST',
		path: '/table',
		handler(request, reply) {
			// TODO parse patch to update database
		},
		config: {
			validate: {
				payload: schema,
			},
		},
	},
];
