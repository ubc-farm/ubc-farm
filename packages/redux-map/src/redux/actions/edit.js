import { selectedTask } from '../selectors.js';
import {
	setTaskLocation,
	addTaskEquipment,
	setTaskEquipment,
	deleteTaskEquipment,
} from './task.js';

export const SET_SELECTED_TASK = 'SET_SELECTED_TASK';

export function setSelected(id, meta) {
	return { type: SET_SELECTED_TASK, payload: id, meta };
}

export function setSelectedLocation(location) {
	return (dispatch, getState) => {
		const selected = selectedTask(getState());
		return dispatch(setTaskLocation(selected, location));
	};
}

export function setSelectedEquipment(position, equipment, count) {
	return (dispatch, getState) => {
		const selected = selectedTask(getState());
		return dispatch(setTaskEquipment(selected, position, equipment, count));
	};
}

export function deleteSelectedEquipment(position) {
	return (dispatch, getState) => {
		const selected = selectedTask(getState());
		return dispatch(deleteTaskEquipment(selected, position));
	};
}

export function addSelectedEquipment() {
	return (dispatch, getState) => {
		const selected = selectedTask(getState());
		return dispatch(addTaskEquipment(selected));
	};
}
