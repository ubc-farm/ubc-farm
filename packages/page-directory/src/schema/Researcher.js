import * as Joi from 'joi';
import Person from './Person.js';

export default Person.keys({
	_id: Joi.string().regex(/^person\/researcher\/\w+$/),
	position: Joi.string(),
	faculty: Joi.string(),
	department: Joi.string(),
	labWebsite: Joi.string().uri(),
	expertise: Joi.string(),
	coursesTaught: Joi.array().items(Joi.string()),
	projects: Joi.string(),
});
