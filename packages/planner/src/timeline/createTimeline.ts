import PouchDB from 'pouchdb';
import { DataItem, Timeline as visTimeline } from 'vis';
import { Store } from 'redux';
import { Task, TaskType, Location } from '@ubc-farm/databases';

import Timeline from 'vis-timeline';
import { generate } from 'shortid';
import createTaskItems, { taskToItem, itemToTask } from './taskItems';
import createLocationGroups from './locationGroups';

type EditCallback = (item: DataItem | null) => void;

const revs = new WeakMap<DataItem, string>();

export async function handleAddItem(item: DataItem, callback: EditCallback) {
	const db: PouchDB.Database<Task> = this;
	const doc = itemToTask(item, revs);
	if (!doc._id) doc._id = generate();

	const res = await db.put(doc);

	item.id = res.id;
	revs.set(item, res.rev);
	callback(item);
}

export async function handleTypeChange(item: DataItem, callback: EditCallback) {
	const db: PouchDB.Database<Task> = this;
	const rev = revs.get(item);

	const doc = await db.get(item.id.toString(), rev);
	if (doc.type === item.className) return;

	doc.type = item.className;
	const res = await db.put(doc);
	revs.set(item, res.rev);
}

/**
 * Listener for when an item is moved on the timeline. Checks if either the
 * start/end or the group (location) has changed, and updates the database and
 * timeline item accordingly.
 */
async function handleMoveItem(item: DataItem, callback?: EditCallback) {
	const db: PouchDB.Database<Task> = this;
	let { id, start, end, group } = item;
	const rev = revs.get(item);
	id = id.toString();
	start = <number> start.valueOf();
	end = <number> end.valueOf();
	group = <string> group;

	const task = await db.get(id, rev);
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

async function handleRemoveItem(item: DataItem, callback: EditCallback) {
	const db: PouchDB.Database<Task> = this;
	await db.remove({ _id: item.id.toString(), _rev: revs.get(item) });
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
