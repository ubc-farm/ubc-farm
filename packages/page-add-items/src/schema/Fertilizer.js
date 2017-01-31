import * as Joi from 'joi';
import Item from './Item.js';

/**
 * Represents a paticular instance of an item, with additional properties
 * such as quantity and location.
 */
export default Item.keys({
	label: Joi.string().only('fertilizer'),
	composition: Joi.object({
		tc: Joi.number(),
		n03: Joi.number(),
		nh4: Joi.number(),
		k20: Joi.number(),
		p205: Joi.number(),
	}),
	// quantity: Joi.number(),
	h20MixRatio: Joi.string().regex(/^\d+:\d+$/, 'ratio'),
});
