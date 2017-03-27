import * as Joi from 'joi';
import Item from './Item.js';

export default Item.keys({
	label: Joi.string().only('seeds'),
	spacing: Joi.object({
		w: Joi.number(),
		l: Joi.number(),
	}),
	depth: Joi.number(),
	seedsPerHole: Joi.string().regex(/^\d+:\d+$/, 'ratio'),
	daysToMaturity: Joi.number(),
	predictedYield: Joi.number(),
	nutrientRequiement: Joi.object({
		n: Joi.number(),
		p: Joi.number(),
		k: Joi.number(),
	}),
});
