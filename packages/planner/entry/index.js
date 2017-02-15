import { parsed } from 'document-promises';
import { equipment, locations, tasks, taskTypes } from '@ubc-farm/databases';
import connectEditor from '../src/editor/index.jsx';
import attachMap from '../src/map/index.js';
import store from '../src/reducer/index.js';
import createTaskPanel from '../src/task-panel/index.jsx';
import setupPlannerTimeline from '../src/timeline/index.js';

Promise.all([
	equipment,
	locations,
	tasks,
	taskTypes,
	parsed,
]).then(([equipmentDB, locationsDB, tasksDB, taskTypesDB]) => {
	connectEditor(store, equipmentDB, locationsDB);
	attachMap(store, locationsDB);
	createTaskPanel(taskTypesDB);
	setupPlannerTimeline(store, {
		tasks: tasksDB,
		taskTypes: taskTypesDB,
		locations: locationsDB
	});
});
