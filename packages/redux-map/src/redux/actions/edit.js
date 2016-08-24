export const SET_SELECTED_TASK = 'SET_SELECTED_TASK';

export function setSelected(id) {
	return { type: SET_SELECTED_TASK, payload: id };
}
