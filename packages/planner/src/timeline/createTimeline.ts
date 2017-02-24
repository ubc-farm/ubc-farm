import { DataItem, Timeline as visTimeline } from 'vis';
import { Task, TaskType, Location } from '@ubc-farm/databases';

import Timeline from 'vis-timeline';
import { generate } from 'shortid';
import createTaskItems, { itemToTask } from './taskItems';
import createLocationGroups from './locationGroups';

type EditCallback = (item: DataItem | null) => void;

const revs = new WeakMap<DataItem, string>();

export async function handleAddItem(
	this: PouchDB.Database<Task>,
	item: DataItem,
	callback: EditCallback,
) {
	const db = this;
	const doc = itemToTask(item, revs);
	if (!doc._id) doc._id = generate();

	const res = await db.put(doc);

	item.id = res.id;
	revs.set(item, res.rev);
	callback(item);
}

export async function handleTypeChange(
	this: PouchDB.Database<Task>,
	item: DataItem,
	callback: EditCallback,
) {
	const db = this;
	const rev = revs.get(item);
	if (!item.id) {
		callback(null);
		return;
	}

	const doc = await db.get(item.id.toString(), { rev });
	if (doc.type === item.className) return;

	if (item.className) doc.type = item.className;
	const res = await db.put(doc);
	revs.set(item, res.rev);
}

/**
 * Listener for when an item is moved on the timeline. Checks if either the
 * start/end or the group (location) has changed, and updates the database and
 * timeline item accordingly.
 */
async function handleMoveItem(
	this: PouchDB.Database<Task>,
	item: DataItem,
	callback: EditCallback,
) {
	const db = this;
	let { id, start, end, group } = item;
	if (!id) {
		callback(null);
		return;
	}

	const rev = revs.get(item);
	id = id.toString();
	start = <number> start.valueOf();
	end = <number> (end ? end.valueOf() : undefined);
	group = <string> group;

	const task = await db.get(id, { rev });
	let changed = false;

	if (task.start.valueOf() !== start || task.end.valueOf() !== end) {
		Object.assign(task, { start, end });
		changed = true;
	}

	if (task.location !== group) {
		task.location = group;
		changed = true;
	}

	if (changed) {
		const res = await db.put(task);
		item.id = res.id;
		revs.set(item, res.rev);
	}
	if (callback) callback(item);
}

async function handleRemoveItem(
	this: PouchDB.Database<Task>,
	item: DataItem,
	callback: EditCallback
) {
	const db = this;
	let _id = item.id;
	const _rev = revs.get(item);
	if (!_id || !_rev) {
		callback(null);
		return;
	}

	_id = _id.toString();
	await db.remove({ _id, _rev });
	callback(item);
}


/**
 * Creates a timeline and loads in items from the provided databases
 */
export default async function createTimeline(
	databases: {
		tasks: PouchDB.Database<Task>,
		taskTypes: PouchDB.Database<TaskType>,
		locations: PouchDB.Database<Location>
	}
) {
	const { tasks, taskTypes, locations } = databases;

	const lastYear = new Date(new Date().getFullYear() - 1, 0);
	const nextYear = new Date(new Date().getFullYear() + 2, 0, 0);

	const [
		{ items, cancel: cancel1 },
		{ groups, cancel: cancel2 },
	] = await Promise.all([
		createTaskItems(tasks, taskTypes, revs),
		createLocationGroups(locations),
	]);

	const timeline: visTimeline = new Timeline(
		document.getElementById('timeline'), items, groups, {
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

	return { timeline, items, groups, cancel() { cancel1(); cancel2(); } };
}
