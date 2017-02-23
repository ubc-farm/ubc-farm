import { createElement, PropTypes, SFC } from 'react'; /** @jsx createElement */
import entries from 'lodash/entries';
import TaskTile from './TaskTile';

type Tasks = Map<string, string> | { [name: string]: string };

/**
 * Container for the task items.
 * @param {Object|Map} props.tasks Map<name, color>
 */
const TaskPanel: SFC<{ tasks: Tasks}> = ({ tasks }) => (
	<div className="task-panel">
		{entries(tasks).map(([name, color]) => (
			<TaskTile key={name} {...{ name, color }} />
		))}
	</div>
);

TaskPanel.propTypes = {
	tasks: PropTypes.oneOfType([
		PropTypes.instanceOf(Map),
		PropTypes.objectOf(PropTypes.string),
	]).isRequired,
};

export default TaskPanel;
