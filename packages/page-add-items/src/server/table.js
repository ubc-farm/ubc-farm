import { unparse } from 'babyparse';

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
		path: '/inventory/table/headers',
		handler(request, reply) {
			const response = request.query.reverse != null
				? fields.reduce((obj, field, i) => { obj[field] = i; return obj; }, {})
				: fields.reduce((obj, field, i) => { obj[i] = field; return obj; }, {});

			return reply(response).type('application/json');
		},
	},
	{
		method: 'GET',
		path: '/inventory/table',
		handler(request, reply) {
			// TODO get data
			return reply(unparse(data, { newline: '\n' })).type('text/csv');
		},
	},
	{
		method: 'POST',
		path: '/inventory/table',
		handler(request, reply) {
			// TODO parse patch to update database
		},
	},
];
