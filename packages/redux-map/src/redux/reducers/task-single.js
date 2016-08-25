import {
	ADD_TASK_EQUIPMENT,
	SET_TASK_EQUIPMENT,
	DELETE_TASK_EQUIPMENT,
	SET_TASK_LOCATION,
	SET_TASK_TIMES,
	SET_TASK_TYPE,
} from '../actions/index.js';

/**
 * Default state for a task. Setting to frozen
 * since there were some bugs due to mutating the defaultState object and
 * having the changes apply to every task.
 */
const defaultTask = Object.freeze({
	type: '',
	start_time: Date.now(),
	end_time: undefined,
	hoursTaken: undefined,
	locationId: undefined,
	equipmentUsage: [],
});

export default function task(state = defaultTask, action) {
	const setState = newState => Object.assign({}, state, newState);
	const { payload } = action;

	switch (action.type) {
		case SET_TASK_EQUIPMENT: {
			const { position } = payload;
			const equipClone = [...state.equipmentUsage];

			const { equipment = equipClone[position].equipment } = payload;
			const { count = equipClone[position].count } = payload;

			equipClone[position] = [equipment, count];

			return setState({ equipmentUsage: equipClone });
		}
		case DELETE_TASK_EQUIPMENT: {
			let { position } = payload;
			const equipClone = [...state.equipmentUsage];

			if (position === undefined) {
				const { equipment } = payload;
				position = equipClone.findIndex(([key]) => key === equipment);
			}

			equipClone.splice(position, 1);

			return setState({ equipmentUsage: equipClone });
		}
		case ADD_TASK_EQUIPMENT: {
			const equipClone = [...state.equipmentUsage];

			equipClone.push([undefined, undefined]);

			return setState({ equipmentUsage: equipClone });
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

		case SET_TASK_LOCATION:
			if (payload === state.locationId) return state;
			return setState({ locationId: payload });
		case SET_TASK_TYPE:
			if (payload === state.type) return state;
			return setState({ type: payload });

		default: return state;
	}
}
