import Timeline from 'vis-timeline';
import { generate } from 'shortid';
import createTaskItems from './taskItems.js';
import createLocationGroups from './locationGroups.js';

async function handleAddItem(db, item, callback) {
	const row = Object.assign({ type: '', location: '' }, item);
	row._id = `${row.type}/${row.location}/${generate()}`;
	const res = await db.put(row);

	item.id = res.id;
	item._rev = res.rev;
	callback(item);
}

async function handleMoveItem(db, item, callback) {
	const { id, start, end, group } = item;
	const task = await db.get(id);
	let changed = false;

	if (task.start_time !== start || task.end_time !== end) {
		task.start_time = start;
		task.end_time = end;
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

async function handleRemoveItem(db, item, callback) {
	await db.remove({ _id: item.id, _rev: item._rev });
	callback(item);
}

export default function createTimeline(databases) {
	const { tasks, taskTypes, locations } = databases;

	const lastYear = new Date(new Date().getFullYear() - 1, 0);
	const nextYear = new Date(new Date().getFullYear() + 2, 0, 0);

	const timeline = new Timeline(
		document.getElementById('timeline-mount'),
		createTaskItems(tasks, taskTypes),
		createLocationGroups(locations),
		{
			onAdd: handleAddItem.bind(null, tasks),
			onMove: handleMoveItem.bind(null, tasks),
			onRemove: handleRemoveItem.bind(null, tasks),
			min: lastYear,
			max: nextYear,
			editable: true,
			selectable: true,
			multiselect: false,
			height: 'calc(50vh - 3rem)',
		}
	);

	timeline.on('select', onSelect);
	initSelector(timeline);

	return timeline;
}
