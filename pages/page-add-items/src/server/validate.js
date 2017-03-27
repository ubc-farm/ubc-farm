import * as Joi from 'joi';

const item = Joi.object().keys({
	class: Joi.any().only('Variable', 'Fixed'),
	product: Joi.string(),
	description: Joi.string(),
	quantity: Joi.number(),
	unit: Joi.string().only('kg', 'each'),
	entryDate: Joi.date(),
	lifeSpan: Joi.string().regex(
		/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d+[HMS])(\d+H)?(\d+M)?(\d+S)?)?$/,
		'ISO 8601 Duration',
	),
	location: Joi.string(),
	salvageValue: Joi.number().integer().allow(null),
	barcode: Joi.string(),
	supplier: Joi.string().allow(null),
	sku: Joi.string().allow(null),
});

export default Joi.array().items(item).single();
