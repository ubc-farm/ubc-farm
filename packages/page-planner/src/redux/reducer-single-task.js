import {  } from './actions.js';

const defaultTask = {
	start_time: undefined,
	end_time: undefined,
	hoursTaken: undefined,
	locationId: undefined,
	equipment: new Map(),
};

export default function task(state = defaultTask, action) {
	switch (action.type) {
		default: return state;
	}
}