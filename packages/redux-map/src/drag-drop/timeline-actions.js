import { id as randomID } from 'ubc-farm-utils';
import Tasks from './tasklist.js';

export function addTask(data, time, location, tasktype, set = this) {
	const clone = Object.assign({}, data);
	if (!('id' in data)) clone.id = randomID();
	if (time !== undefined) clone.start = time;
	if (location !== undefined) clone.group = location;

	if (tasktype !== undefined) {
		clone.style = `--brand-primary: ${Tasks.get(tasktype)}`;
	}

	set.add([clone]);
	return clone.id;
}

export function updateTaskType(newType, itemId, set = this) {
	set.update({ id: itemId, style: `--brand-primary: ${Tasks.get(newType)}` });
}
