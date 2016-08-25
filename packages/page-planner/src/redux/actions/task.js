export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const ADD_TASK_EQUIPMENT = 'ADD_TASK_EQUIPMENT';
export const SET_TASK_EQUIPMENT = 'SET_TASK_EQUIPMENT';
export const DELETE_TASK_EQUIPMENT = 'DELETE_TASK_EQUIPMENT';

export const SET_TASK_LOCATION = 'SET_TASK_LOCATION';
export const SET_TASK_NAME = 'SET_TASK_NAME';
export const SET_TASK_TYPE = 'SET_TASK_TYPE';
export const SET_TASK_TIMES = 'SET_TASK_TIMES';

export function addTask(id, defaults) {
	return { type: ADD_TASK, payload: id, meta: defaults };
}

export function deleteTask(id) {
	return { type: DELETE_TASK, payload: id };
}

export function setTaskLocation(id, newLocation) {
	return { type: SET_TASK_LOCATION, id, payload: newLocation };
}

export function setTimes(id, start, end) {
	return {
		type: SET_TASK_TIMES,
		id,
		payload: { start, end },
	};
}

export function setTaskType(id, newType) {
	return { type: SET_TASK_TYPE, id, payload: newType };
}

export function setTaskName(id, name) {
	return { type: SET_TASK_NAME, id, payload: name };
}

export function setTaskEquipment(id, position, equipment, count) {
	return {
		type: SET_TASK_EQUIPMENT,
		id,
		payload: { position, equipment, count },
	};
}

export function addTaskEquipment(id) {
	return { type: ADD_TASK_EQUIPMENT, id };
}

export function deleteTaskEquipment(id, position) {
	return { type: DELETE_TASK_EQUIPMENT,	id,	payload: { position } };
}
