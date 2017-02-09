import { DataSet } from 'vis-timeline';
import { observeStore } from 'ubc-farm-utils';
import { taskListSelector, taskTypeMap } from '../redux/selectors.js';

const items = new DataSet(undefined, { queue: true });

function taskToItem(task, id = task.id) {
	const { type } = task;

	const result = {
		id,
		content: task.name || type,
		end: task.end_time,
		group: task.locationId,
		start: task.start_time,
		className: type,
		type: 'box', // TODO
	};

	if (taskTypeMap().has(type)) {
		result.style = `--brand-primary: ${taskTypeMap().get(type)}`;
	}

	return result;
}

/**
 * Updates the dataset with the new items whenever the
 * state slice changes.
 */
function deepUpdate(sourceState, lastSource = new Map()) {
	items.forEach(({ id }) => items.remove(id, 'redux-update'), {
		filter: ({ id }) => !sourceState.has(id),
	});

	for (const [id, task] of sourceState) {
		const lastVal = lastSource.get(id);
		if (lastVal === task) continue;

		const data = taskToItem(task, id);

		items.update(data, 'redux-update');
	}

	items.flush();
}

const listen = store => observeStore(store, taskListSelector, deepUpdate);

export {
	listen,
	items as default,
};
