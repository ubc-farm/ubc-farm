import * as Joi from 'joi';

export default Joi.object({
	type: Joi.string(),
	start: Joi.date().iso(),
	end: Joi.date().iso(),
	length: Joi.number().positive().integer(),
	allDay: Joi.boolean(),
	title: Joi.string(),
	location: Joi.string(),
	done: Joi.boolean(),
});
