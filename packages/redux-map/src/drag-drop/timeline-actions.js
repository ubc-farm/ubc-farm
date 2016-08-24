import { id as randomID } from 'ubc-farm-utils';
import Tasks from './tasklist.js';

export function addTask(data, time, location, tasktype, set = this) {
	console.log(data, time, location, tasktype, set);

	const clone = Object.assign({ id: randomID() }, data);
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
