import * as Joi from 'joi';
import Person from './Person.js';

export default Person.keys({
	_id: Joi.string().regex(/^person\/employee\/\w+$/),
	pay: Joi.number().integer(),
	employmentType: Joi.any().only('fullTime', 'partTime'),
	holidayDays: Joi.array().items(Joi.date()),
	sickDays: Joi.array().items(Joi.date()),
	paidLeaveDays: Joi.array().items(Joi.date()),
	inLieuHours: Joi.array().items(Joi.date()),
	medicalLeaveTime: Joi.object(),
	emergencyContact: Person,
	workingDays: Joi.array(Joi.number().allow(0, 1, 2, 3, 4, 5, 6)).unique(),
});
