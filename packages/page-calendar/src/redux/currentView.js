import moment from 'moment';
import { createSelector } from 'reselect';

const NAVIGATE = 'calendar/currentView/NAVIGATE';
const SELECT_DAY = 'calendar/currentView/SELECT_DAY';
const CHANGE_VIEW = 'calendar/currentView/CHANGE_VIEW';

const defaultState = {
	view: 'agenda',
	date: moment(),
};

// Reducer
export default function currentView(state = defaultState, action) {
	switch (action.type) {
		case NAVIGATE:
			return action.payload;

		case SELECT_DAY:
			return Object.assign({}, state, { date: moment(action.payload) });

		case CHANGE_VIEW:
			return Object.assign({}, state, { view: action.payload });

		default: return state;
	}
}


// Selectors
export const getDate = state => state.currentView.date;
export const getView = state => state.currentView.view;
/** @returns {moment[]} date range - first item is start, second item is end */
export const getDateRange = createSelector(
	getDate,
	getView,
	(date, view) => (
		view === 'agenda'
			? [date.clone(),	date.clone().add(1, 'weeks').endOf('day')]
			: [date.clone().startOf(view), date.clone().endOf(view)]
	),
);

// Actions
export const navigate = (date, view) => ({ type: NAVIGATE, payload: { date, view } });
export const selectDay = date => ({ type: SELECT_DAY,	payload: moment(date) });
export const changeView = view => ({ type: CHANGE_VIEW, payload: view });