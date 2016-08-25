import { createSelector } from 'reselect';
import { map } from './reducers/task-colors.js';

export const taskTypeMap = () => map;
export const taskTypes = () => map.keys();
export const taskColors = () => map.values();

export const taskListSelector = state => state.tasks;

export const locationsList = state => state.locations;

export const selectedTask = state => state.selected.value;
export const selectedTaskObject = createSelector(
	selectedTask,
	taskListSelector,
	(selectedId, list) => list.get(selectedId)
);
