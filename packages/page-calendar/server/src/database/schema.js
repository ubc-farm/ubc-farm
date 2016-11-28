import * as Joi from 'joi';

const singleSchema = Joi.object({
	type: Joi.string(),
	start: Joi.date().iso(),
	end: Joi.date().iso(),
	length: Joi.number().positive().integer(),
	allDay: Joi.boolean(),
	title: Joi.string(),
	location: Joi.string(),
	done: Joi.boolean(),
});

export default Joi.array().items(singleSchema);
