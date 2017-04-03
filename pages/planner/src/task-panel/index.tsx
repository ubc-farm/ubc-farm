import { TaskType } from '@ubc-farm/databases';
import { connectAll } from '@ubc-farm/database-utils';
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import TaskPanel from './TaskPanel';

export default function createTaskPanel(taskTypesDB: PouchDB.Database<TaskType>) {
	const WrappedPanel = connectAll(
		(doc: TaskType) => doc.color,
		{ rowKey: 'tasks' },
	)(TaskPanel);

	render(<WrappedPanel db={taskTypesDB} />, document.getElementById('tasklist'));
}
