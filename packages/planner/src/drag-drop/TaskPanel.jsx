import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { entries } from 'lodash';
import TaskTile from './tile.js';

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
