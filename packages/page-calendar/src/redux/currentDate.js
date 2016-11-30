import moment from 'moment';

export const SELECT_DAY = 'calendar/currentDate/SELECT_DAY';
export const ADJUST_MONTH = 'calendar/currentDate/ADJUST_MONTH';
export const ADJUST_DAY = 'calendar/currentDate/ADJUST_DAY';

export default function currentDateReducer(state = moment(), action) {
	switch (action.type) {
		case SELECT_DAY: {
			const { payload: newDate, meta: isOtherMonth } = action;
			const newState = state.clone();
			if (isOtherMonth) {
				if (newDate > 15) newState.subtract(1, 'months');
				else newState.add(1, 'months');
			}
			return newState.date(action.payload);
		}
		case ADJUST_MONTH:
			return state.clone().add(Math.sign(action.payload), 'months');
		case ADJUST_DAY:
			return state.clone().add(Math.sign(action.payload), 'days');
		default:
			return state;
	}
}


/** @returns {Moment} currently selected date */
export const getCurrentDate = state => state.currentDate;


export const selectDay = (date, isOtherMonth) => ({
	type: SELECT_DAY,
	payload: date,
	meta: isOtherMonth,
});
export const nextMonth = meta => ({ type: ADJUST_MONTH, payload: 1, meta });
export const lastMonth = meta => ({ type: ADJUST_MONTH, payload: -1, meta });
export const nextDay = meta => ({ type: ADJUST_DAY, payload: 1, meta });
export const lastDay = meta => ({ type: ADJUST_DAY, payload: -1, meta });
