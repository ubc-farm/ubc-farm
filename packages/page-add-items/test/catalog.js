import test from 'tape';
import { schema, boolean } from 'benthos';
import knex from '../src/connection.js';

const CatalogItem = schema({
	_id: 'item/{{words}}/{{uuid}}',
	class: () => (boolean() ? 'Variable' : 'Fixed'),
	product: '{{words}}',
	description: '{{words}}',
	quantity: '{{float}}',
	unit: '{{string}}',
	valuePerUnit: '{{integer}}',
	entryDate: '{{date}}',
	lifeSpan: '{{...}}',
	location: '{{words}}',
	salvageValue: '{{integer}}',
	barcode: '{{serial(* **** **** *)}}',
	supplier: '{{words}}',
	sku: '{{string}}',
});

test('Simple catalog view', async (t) => {
	await knex('inventory').select().delete();

});
