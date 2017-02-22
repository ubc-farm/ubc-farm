import { parsed } from 'document-promises';
import { equipment, locations, tasks, taskTypes } from '@ubc-farm/databases';
import connectEditor from '../src/editor/index.jsx';
import attachMap from '../src/map/index.js';
import store from '../src/reducer/index.js';
import createTaskPanel from '../src/task-panel/index.jsx';
import setupPlannerTimeline from '../src/timeline/index.js';

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