import connectAll from '@ubc-farm/databases/src/connect/connectAll.js';
import taskTypes from '@ubc-farm/databases/src/task-types.js';
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import TaskPanel from './TaskPanel.jsx';

export default function createTaskPanel() {
	const WrappedPanel = connectAll(
		doc => doc.color,
		{ rowKey: 'tasks' },
	)(TaskPanel);

	render(<WrappedPanel db={taskTypes} />, document.getElementById('tasklist'));
}
