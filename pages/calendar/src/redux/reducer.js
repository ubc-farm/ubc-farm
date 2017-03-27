import moment from 'moment';
import { handleActions } from 'redux-actions';
import { CHANGE_VIEW, BACK_DATE, NEXT_DATE, GO_TO_TODAY, GO_TO_DATE } from './actions';

const setState = (...args) => Object.assign({}, ...args);

// Reducer for calendar
export default handleActions({
	[CHANGE_VIEW]: (state, { payload }) => setState(state, { view: payload }),
	[GO_TO_DATE]: (state, { payload }) => setState(state, { date: payload }),

	[BACK_DATE]: ({ date, view }) => setState(state, {
		date: date.clone().subtract(1, view === 'agenda' ? 'week' : view)
	}),
	[NEXT_DATE]: ({ date, view }) => setState(state, {
		date: date.clone().add(1, view === 'agenda' ? 'week' : view)
	}),
	[GO_TO_TODAY]: (state) => setState({ date: moment() }),
}, { date: moment(), view: 'agenda' });
