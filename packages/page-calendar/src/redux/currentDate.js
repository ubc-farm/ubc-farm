import moment from 'moment';

export const SELECT_DAY = 'calendar/currentDate/SELECT_DAY';
export const ADJUST_MONTH = 'calendar/currentDate/ADJUST_MONTH';
export const ADJUST_DAY = 'calendar/currentDate/ADJUST_DAY';

export default function currentDateReducer(state = moment(), action) {
	switch (action.type) {
		case SELECT_DAY:
			return state.clone().date(action.payload);
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


export const selectDay = date => ({ type: SELECT_DAY, payload: date });
export const nextMonth = meta => ({ type: ADJUST_MONTH, payload: 1, meta });
export const lastMonth = meta => ({ type: ADJUST_MONTH, payload: -1, meta });
export const nextDay = meta => ({ type: ADJUST_DAY, payload: 1, meta });
export const lastDay = meta => ({ type: ADJUST_DAY, payload: -1, meta });
