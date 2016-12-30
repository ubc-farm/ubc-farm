import moment from 'moment';
import { createSelector } from 'reselect';
import { getDate } from './currentView.js';
import { getEvents } from './eventDB.js';

const monthRange = createSelector(
	getDate,
	date => [date.clone().startOf('month'), date.clone().endOf('month')],
);

function generateBaseMap(date) {
	const base = new Map();
	const daysInMonth = date ? date.daysInMonth() : 31;
	for (let i = 1; i <= daysInMonth; i += 1) base.set(i, new Set());
	return base;
}

export const getMonthIcons = createSelector(
	getEvents,
	getDate,
	(events, date) => {
		const [rangeStart, rangeEnd] = monthRange(date).map(d => d.unix());

		const base = generateBaseMap(date);

		for (const { start, end, type } of events) {
			if (start < rangeEnd && end > rangeStart) {
				const dayOfMonth = moment.unix(start).date();
				base.get(dayOfMonth).add(type);
			}
		}

		return base;
	},
);

export const getDayIcons = (state, dayOfMonth) => getMonthIcons(state).get(dayOfMonth);

export const getTruncatedIcons = createSelector(
	getMonthIcons,
	(monthIcons) => {
		const truncatedMap = new Map();
		for (const [dayOfMonth, set] of monthIcons) {
			let newSet = set;
			if (set.size > 3) {
				const [first, second] = set;
				newSet = new Set().add(first).add(second).add('more');
			}

			truncatedMap.set(dayOfMonth, newSet);
		}

		return truncatedMap;
	},
);
