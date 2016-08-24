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
		case SET_TASK_LOCATION: {
			if (payload === state.locationId) return state;
			return setState({ locationId: payload });
		}
		case SET_TASK_TIMES: {
			const { start, end } = payload;
			const changes = {};

			if (start != null && start !== state.start_time) {
				Object.assign(changes, { start_time: start });
			}
			if (end != null && end !== state.end_time) {
				Object.assign(changes, { end_time: end });
			}

			if (Object.keys(changes) === 0) return state;
			return setState(changes);
		}

		default: return state;
	}
}
