/// <reference path="../../custom-types/document-promises/index.d.ts" />

import { parsed } from 'document-promises';
import { getEquipment, getLocations, getTasks, getTaskTypes } from '@ubc-farm/databases';
import connectEditor from '../src/editor/';
import attachMap from '../src/map/';
import store from '../src/reducer/';
import createTaskPanel from '../src/task-panel/';
import setupPlannerTimeline from '../src/timeline/';

const equipment = getEquipment();
const locations = getLocations();
const tasks = getTasks();
const taskTypes = getTaskTypes();

Object.assign(window, { equipment, locations, tasks, taskTypes });

Promise.all([
	equipment,
	locations,
	tasks,
	taskTypes,
	parsed,
]).then(([equipmentDB, locationsDB, tasksDB, taskTypesDB]) => Promise.all([
	connectEditor(store, equipmentDB, locationsDB, tasksDB),
	attachMap(store, locationsDB),
	createTaskPanel(taskTypesDB),
	setupPlannerTimeline(store, {
		tasks: tasksDB,
		taskTypes: taskTypesDB,
		locations: locationsDB
	}),
])).catch(err => console.error(err));
