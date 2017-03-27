import { createElement, PropTypes, SFC } from 'react'; /** @jsx createElement */
import TaskTile from './TaskTile';

type Tasks = { [name: string]: string };

/**
 * Container for the task items.
 * @param {Object|Map} props.tasks Map<name, color>
 */
const TaskPanel: SFC<{ tasks: Tasks}> = ({ tasks }) => (
	<div className="task-panel">
		{Object.entries(tasks).map(([name, color]) => (
			<TaskTile key={name} {...{ name, color }} />
		))}
	</div>
);

TaskPanel.propTypes = {
	tasks: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TaskPanel;
