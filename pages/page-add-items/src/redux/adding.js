const OPEN = 'inventory/adding/OPEN';
const CLOSE = 'inventory/adding/CLOSE';
const TOGGLE = 'inventory/adding/TOGGLE';

export default function addingReducer(state = false, action = {}) {
	console.log(state, action.type);
	switch (action.type) {
		case OPEN: return true;
		case CLOSE: return false;
		case TOGGLE: return !state;
		default: return state;
	}
}

export const isAdding = store => store.adding;

export const startAdding = () => ({ type: OPEN });
export const stopAdding = () => ({ type: CLOSE });
export const toggleAdding = () => ({ type: TOGGLE });
