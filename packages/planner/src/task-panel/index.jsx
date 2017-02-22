import { connectAll } from '@ubc-farm/databases';
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import TaskPanel from './TaskPanel';

export default function createTaskPanel(taskTypesDB) {
	const WrappedPanel = connectAll(
		doc => doc.color,
		{ rowKey: 'tasks' },
	)(TaskPanel);

	render(<WrappedPanel db={taskTypesDB} />, document.getElementById('tasklist'));
}
