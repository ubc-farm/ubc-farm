import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import TaskPanel from './TaskPanel.jsx';
import DBWrapper from '../editor/DBWrapper.jsx';

export default function connectEditor(taskTypeDB) {
	const WrappedPanel = DBWrapper('tasks', 'doc.color', taskTypeDB)(TaskPanel);

	render(<WrappedPanel />, document.getElementById('tasklist'));
}
