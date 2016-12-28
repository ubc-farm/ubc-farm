import { handle } from 'redux-pack';

function generateBase(date) {
	const base = {};
	const daysInMonth = date ? date.daysInMonth() : 31;
	for (let i = 1; i <= daysInMonth; i += 1) base[i] = new Set();
	return base;
}

function findMonthEventTypes([rangeStart, rangeEnd]) {
	return db.find({
		selector: {
			start: { $lt: rangeEnd.valueOf() },
			end: { $gt: rangeStart.valueOf() },
		},
		fields: ['type', 'start'],
	});
}


const READ_TYPES = 'calendar/monthIcons/READ_TYPES';

// Reducer
export default function monthIcons(state = generateBase(), action, currentView) {
	switch (action.type) {
		case READ_TYPES: {
			const { payload } = action;
			return handle(state, action, {
				success: () => payload.docs.reduce((newState, { type, start }) => {
					const date = start.date();
					newState[date].add(type);
					return newState;
				}, generateBase(currentView.date)),
			});
		}

		default: return state;
	}
}

// Selectors
export const getMonthIcons = state => state.monthIcons;
export const getDayIcons = (state, dayOfMonth) => state.monthIcons[dayOfMonth];

// Actions
export const readMonthEventTypes = range => ({
	type: READ_TYPES,
	promise: findMonthEventTypes(range),
	meta: { month: range[0].month() },
});
