const ACTIVE_SETTER = 'ACTIVE_SETTER';

export default function activeReducer(state = '', action) {
	if (action.type === ACTIVE_SETTER) return action.payload;
	return state;
}

export const getActive = state => state.active;

export const setActive = id => ({ type: ACTIVE_SETTER, payload: id });
