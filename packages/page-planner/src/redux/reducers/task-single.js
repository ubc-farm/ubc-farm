import {
	SET_TASK_EQUIPMENT,
	SET_TASK_LOCATION,
	SET_TASK_TIMES,
} from '../actions/index.js';

/* eslint-disable camelcase */

const defaultTask = {
	type: '',
	start_time: undefined,
	end_time: undefined,
	hoursTaken: undefined,
	locationId: undefined,
	equipmentUsage: new Map(),
};

export default function task(state = defaultTask, action) {
	const setState = newState => Object.assign({}, state, newState);
	const { payload } = action;

	switch (action.type) {
		case SET_TASK_EQUIPMENT: {
			const { equipment, count } = payload;
			const equipClone = new Map(state.equipmentUsage);
			equipClone.set(equipment, count);

			return setState({ equipmentUsage: equipClone });
		}
		case SET_TASK_LOCATION:
			return setState({ locationId: payload });
		case SET_TASK_TIMES: {
			const { start_time = state.start_time } = payload;
			const { end_time = state.end_time } = payload;
			return setState({ start_time, end_time });
		}

		default: return state;
	}
}
