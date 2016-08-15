import {Event} from '../../database/index.js';
import {longMonthNames, shortMonthNames} from '../../utils/calendar.js';
import {
	transformReply,
	arrayToObjectMap,
	removeNullandUndef
} from './transformer.js';

const Joi = require('joi') //eslint-disable-line import/no-commonjs

/**
 * Used to get Events sorted by date and time
 * @param {string} request.params.year - 2 digit years are converted to 2000s
 * @param {string} [request.params.month] - either the index or a month name
 * @param {string} [request.params.date]
 */
export function calendarCollection(request, reply) {
	let {year, month, date} = request.params; 

	year = parseInt(year);
	if (year < 100) year = `20${year}`;

	if (month !== undefined && isNaN(month)) {
		if (month.length > 3) month = longMonthNames.indexOf(month);
		else month = shortMonthNames.indexOf(month);
	} else if (month !== undefined) month = parseInt(month) - 1;

	if (date !== undefined) date = parseInt(date);

	const startDate = new Date(year, month || 0, date);

	let endDate;
	if (date !== undefined) endDate = new Date(year, month, date + 1);
	else if (month !== undefined) endDate = new Date(year, month + 1);
	else endDate = new Date(year + 1, 0);
	endDate = new Date(endDate.getTime() - 1); //Subtract 1 millisecond
	
	let query = Event.query()
		.where('start_time', '>=', startDate)
		.andWhere('end_time', '<=', endDate)
		.orderBy('start_time', 'desc')
		.then(list => arrayToObjectMap(list, Event.idColumn))
		.then(json => removeNullandUndef(json));

	return transformReply(query, request, reply);
}

const yearSchema = Joi.number().integer().positive();
const monthSchema = Joi.alternatives().try(
	Joi.number().min(1).max(12), 
	Joi.string().alphanum().min(3).max(9)
); 

export default [
	{
		method: 'GET',
		path: '/api/calendar/{year}/{month}/{date}',
		handler: calendarCollection,
		config: {
			validate: {
				params: {
					year: yearSchema,
					month: monthSchema,
					date: Joi.number().min(1).max(31).integer().positive()
				}
			}
		}
	},
	{
		method: 'GET',
		path: '/api/calendar/{year}/{month}',
		handler: calendarCollection,
		config: {
			validate: {
				params: {
					year: yearSchema,
					month: monthSchema
				}
			}
		}
	},
	{
		method: 'GET',
		path: '/api/calendar/{year}',
		handler: calendarCollection,
		config: {
			validate: {
				params: {
					year: yearSchema
				}
			}
		}
	},
	{
		method: 'GET',
		path: '/api/calendar',
		handler: (request, reply) => {
			const currentYear = new Date(Date.now()).getFullYear();
			return reply().redirect(`/api/calendar/${currentYear}`);
		}
	}
]