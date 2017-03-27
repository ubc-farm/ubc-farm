import * as Joi from 'joi';

const id = Joi.string().regex(/^person\/[^\/]+\/\w+$/, 'Person docURI ID');

const address = Joi.alternatives().try(
	Joi.string(),
	Joi.object({
		addressCountry: Joi.string(), // ie: USA
		addressLocality: Joi.string(), // ie: Mountain View
		addressRegion: Joi.string(), // ie: CA, BC
		postalCode: Joi.string().alphanum(),
		streetAddress: Joi.string(),
	}),
);

export default Joi.object({
	_id: id,
	role: Joi.string().lowercase().regex(/^[a-z_0-9]$/, 'snake_case'),
	email: Joi.string().email(),
	phoneNumber: Joi.string().regex(/^[0-9]$/, 'Phone number'),
	addressMailing: address,
	addressPhysical: address,
});
