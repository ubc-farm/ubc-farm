import Timeline from 'vis-timeline';
import { generate } from 'shortid';
import createTaskItems from './taskItems.js';
import createLocationGroups from './locationGroups.js';

export async function handleAddItem(item, callback) {
	const db = this;
	const row = Object.assign({}, item);
	row._id = generate();
	const res = await db.put(row);

	if (callback) {
		item.id = res.id;
		item._rev = res.rev;
		callback(item);
	}
}

async function handleMoveItem(item, callback) {
	const db = this;
	const { id, start, end, group } = item;
	const task = await db.get(id);
	let changed = false;

	if (task.start !== start || task.end !== end) {
		Object.assign(task, { start, end });
		changed = true;
	}

	if (task.location !== group) {
		task.location = group;
		const [type, , hash] = id.split('/');
		task._id = `${type}/${task.location}/${hash}`;
		changed = true;
	}

	if (changed) {
		const res = await db.put(task);
		item.id = res.id;
		item._rev = res.rev;
		callback(item);
	} else {
		callback(item);
	}
}

async function handleRemoveItem(item, callback) {
	const db = this;
	await db.remove({ _id: item.id, _rev: item._rev });
	callback(item);
}


/**
 * @param {redux.Store} store
 * @param {Object} databases
 * @param {PouchDB} databases.tasks
 * @param {PouchDB} databases.taskTypes
 * @param {PouchDB} databases.locations
 */
export default function createTimeline(store, databases) {
	const { tasks, taskTypes, locations } = databases;

	const lastYear = new Date(new Date().getFullYear() - 1, 0);
	const nextYear = new Date(new Date().getFullYear() + 2, 0, 0);

	const timeline = new Timeline(
		document.getElementById('timeline'),
		createTaskItems(tasks, taskTypes),
		createLocationGroups(locations),
		{
			onAdd: handleAddItem.bind(tasks),
			onMove: handleMoveItem.bind(tasks),
			onRemove: handleRemoveItem.bind(tasks),
			min: lastYear,
			max: nextYear,
			editable: true,
			selectable: true,
			multiselect: false,
			height: 'calc(50vh - 3rem)',
		},
	);

	return timeline;
}