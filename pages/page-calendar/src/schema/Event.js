import * as Joi from 'joi';

const unix = Joi.number().positive().integer().description('Unix Timestamp (seconds)');

export default Joi.object({
	type: Joi.string(),
	start: unix,
	end: unix,
	length: Joi.number().positive().integer(),
	allDay: Joi.boolean(),
	title: Joi.string(),
	location: Joi.string(),
	done: Joi.boolean(),
});
