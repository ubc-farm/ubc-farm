import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import entries from 'lodash/entries';
import TaskTile from './TaskTile.jsx';

/**
 * Container for the task items.
 * @param {Object|Map} props.tasks Map<name, color>
 */
const TaskPanel = ({ tasks }) => (
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
