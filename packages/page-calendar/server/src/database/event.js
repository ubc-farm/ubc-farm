import moment from 'moment';
import schema from './schema.js';

export const getDayEvents = {
	method: 'GET',
	path: '/events/{year}/{month}/{day}',
	handler({ params: { year, month, day } }, reply) {
		const time = moment({ year, month, day });
		const range = [time.unix(), time.endOf('day').unix()];

		const events = knex('events')
			.select()
			.whereBetween('start', range)
			.orWhereBetween('end', range)
			.orderBy('start')
			.map((item) => {
				const start = moment.unix(item.start);
				const end = moment.unix(item.end);
				return Object.assign(item, {
					start,
					end,
					length: end.diff(start, 'minutes'),
				});
			});

		return reply(events).type('application/json');
	},
	config: {
		response: { payload: schema },
	},
};

export const getMonthEvents = {
	method: 'GET',
	path: '/events/{year}/{month}',
	handler({ params: { year, month }, query: { select } }, reply) {
		const time = moment({ year, month });
		const range = [time.unix(), time.endOf('month').unix()];

		const events = knex('events')
			.select(select.split(','))
			.whereBetween('start', range)
			.orWhereBetween('end', range)
			.orderBy('start')
			.map(item => Object.assign(item, { start: moment.unix(item.start) }));

		return reply(events).type('application/json');
	},
	config: {
		response: { payload: schema },
	},
};
