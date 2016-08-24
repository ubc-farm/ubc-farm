export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export function addTask(id, defaults) {
	return { type: ADD_TASK, payload: id, meta: defaults };
}

export function deleteTask(id) {
	return { type: DELETE_TASK, payload: id };
}
