import { createSelector } from 'reselect';
import { map } from './reducers/task-colors.js';

export const taskTypeMap = () => map;
export const taskTypes = () => map.keys();
export const taskColors = () => map.values();

export const taskListSelector = state => state.tasks;

export const locationsList = state => state.locations;
