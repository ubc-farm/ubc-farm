import moment from 'moment';
import * as Joi from 'joi';
import Event from '../schema/Event.js';
import db from '../pouchdb.js';

const response = {
	schema: Joi.array().items(Event),
};

function findEventsInRange(rangeStart, rangeEnd) {
	return db.find({
		selector: {
			start: { $lt: rangeEnd, $gte: rangeStart },
			end: { $gt: rangeStart, $lte: rangeEnd },
		},
		sort: ['start', 'end'],
	})
	.then(res => res.docs);
}

export const getDayEvents = {
	method: 'GET',
	path: '/events/{year}/{month}/{day}',
	handler({ params: { year, month, day } }, reply) {
		const time = moment({ year, month, day });

		return reply(findEventsInRange(
			time.unix(),
			time.endOf('day').unix(),
		)).type('application/json');
	},
	config: { response },
};

export const getMonthEvents = {
	method: 'GET',
	path: '/events/{year}/{month}',
	handler({ params: { year, month } }, reply) {
		const time = moment({ year, month });

		return reply(findEventsInRange(
			time.unix(),
			time.endOf('day').unix(),
		)).type('application/json');
	},
	config: { response },
};
