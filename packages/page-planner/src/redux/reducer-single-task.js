import {  } from './actions.js';

const defaultTask = {
	start_time: undefined,
	end_time: undefined,
	hoursTaken: undefined,
	locationId: undefined,
	equipmentUsage: new Map(),
};

export default function task(state = defaultTask, action) {
	switch (action.type) {
		case SET_TASK_EQUIPMENT: {
			const { id, count } = action.payload;
			const equipClone = new Map(state.equipmentUsage);

			return equipClone.set(id, count);
		}
		default: return state;
	}
}