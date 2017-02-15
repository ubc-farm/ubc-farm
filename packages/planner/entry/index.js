import { parsed } from 'document-promises';
import connectEditor from '../src/editor/index.jsx';
import attachMap from '../src/map/index.js';
import store from '../src/reducer/index.js';
import createTaskPanel from '../src/task-panel/index.jsx';
import setupPlannerTimeline from '../src/timeline/index.js';

parsed.then(() => {
	connectEditor(store);
	attachMap(store);
	createTaskPanel();
	setupPlannerTimeline(store);
});
