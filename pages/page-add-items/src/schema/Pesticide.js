import * as Joi from 'joi';
import Item from './Item.js';

const duration = Joi.string().regex(
	/^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/,
	'ISO 8601 Duration',
);

/**
 * Represents a paticular instance of an item, with additional properties
 * such as quantity and location.
 */
export default Item.keys({
	label: Joi.string().only('pesticide'),
	activeIngredients: Joi.object().pattern(/^.+$/, Joi.number()),
	// quantity: Joi.number(),
	applicationLocation: Joi.string(),
	h20MixRatio: Joi.string().regex(/^\d+:\d+$/, 'ratio'),
	entryInterval: duration,
	harvestInterval: duration,
});
