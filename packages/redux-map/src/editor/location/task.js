import { createSelector } from 'reselect';
import { selectedTask, taskListSelector } from '../../redux/selectors.js';

const selectedTaskObject = createSelector(
	selectedTask,
	taskListSelector,
	(selectedId, list) => list.get(selectedId)
);

export default function getInputProps(state) {
	const selected = selectedTaskObject(state);

	let value = '';
	let disabled = false;

	if (selected != null) value = selected.locationId;
	else disabled = true;

	return { value, disabled };
}
