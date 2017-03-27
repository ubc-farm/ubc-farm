import * as Joi from 'joi';

const duration = Joi.string().regex(
	/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d+[HMS])(\d+H)?(\d+M)?(\d+S)?)?$/,
	'ISO 8601 Duration',
);

const id = Joi.string().regex(/^item\/[^\/]+\/\w+$/, 'Item docURI ID');
const snakeCase = Joi.string().lowercase().regex(/^[a-z_0-9]$/, 'snake_case');

/**
 * Represents a type of item in the catalog
 */
export default Joi.object({
	_id: id,
	label: snakeCase,
	product: snakeCase,
	description: Joi.string(),
	unit: Joi.string().only('kg', 'each'),
	lifeSpan: duration,
	salvageValue: Joi.number().integer().allow(null),
	barcode: Joi.string(),
	supplier: Joi.string().allow(null),
	sku: Joi.string().allow(null),
	quantity: Joi.number(),
	entryDate: Joi.date(),
	location: Joi.string(),
});
