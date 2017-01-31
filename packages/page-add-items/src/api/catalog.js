import * as Joi from 'joi';
import { snakeCase, pick } from 'lodash-es';
import Item from '../schema/Item.js';
import itemAsset from '../schema/itemURI.js';
import db from '../pouchdb.js';

const columns = [
	'class', 'product',
	'unit', 'valuePerUnit', 'salvageValue',
	'lifeSpan', 'barcode', 'supplier', 'sku',
];

const response = {
	schema: Joi.array().single().items(Item),
};

export const getCatalog = {
	method: 'GET',
	path: '/catalog',
	async handler({ params: { name } }, reply) {
		const products = new Set();
		const results = [];
		try {
			const { rows } = await db.allDocs();

			rows.forEach((row) => {
				const { product } = itemAsset(row._id);
				if (!products.has(product)) {
					results.push(row);
					products.add(product);
				}
			});

			return reply(results).type('application/json');
		} catch (err) {
			return reply(err);
		}
	},
	config: { response },
};

export const getCatalogItem = {
	method: 'GET',
	path: '/catalog/{name}',
	async handler({ params: { name } }, reply) {
		const prefix = itemAsset({ product: snakeCase(name) });

		try {
			const { rows } = await db.allDocs({
				include_docs: true,
				startkey: prefix,
				endkey: `${prefix}\uffff`,
				limit: 1,
			});

			if (rows.length === 0) return reply().code(404);

			const slice = pick(rows[0], columns);
			return reply(slice).type('application/json');
		} catch (err) {
			return reply(err);
		}
	},
	config: { response },
};
