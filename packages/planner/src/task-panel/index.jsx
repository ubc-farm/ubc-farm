import connectAll from '@ubc-farm/databases/src/connect/connectAll.js';
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import TaskPanel from './TaskPanel.jsx';

export default function createTaskPanel(taskTypesDB) {
	const WrappedPanel = connectAll(
		doc => doc.color,
		{ rowKey: 'tasks' },
	)(TaskPanel);

	render(<WrappedPanel db={taskTypesDB} />, document.getElementById('tasklist'));
}
