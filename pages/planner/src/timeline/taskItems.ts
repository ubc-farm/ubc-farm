import { Task, TaskType } from '@ubc-farm/databases';
import { DataItem, DataSet as visDataSet } from 'vis';
import { DataSet } from 'vis-timeline';
import moment from 'moment';

function getType(id: string) {
	return id.slice(0, id.indexOf('/'));
}

function getColor(taskTypeDb: PouchDB.Database<TaskType>, id: string) {
	return taskTypeDb.get(id).then(doc => doc.color);
}

type RevMap = WeakMap<DataItem, string>;

const hourInMilli = 3.6e+6;
export function taskToItem(doc: Task, revMap: RevMap): DataItem {
	const { _id, _rev, name, location, type } = doc;
	if (!type) throw new Error('Missing type on task');

	let { start, end } = doc;
	if (!start) throw new Error();

	start = start.valueOf();
	end = end && end.valueOf();

	const item = {
		id: _id,
		content: name || type,
		start,
		end: end || start + hourInMilli,
		group: location,
		className: type,
		type: 'box',
	};

	revMap.set(item, _rev);
	return item;
}

export function itemToTask(item: DataItem, revMap: RevMap): Task {
	const type = item.className || '';
	if (!item.id) throw new TypeError(`item missing ID! - ${JSON.stringify(item)}`);

	const start = moment(item.start);
	const end = item.end ? moment(item.end) : moment(start).add(1, 'hour');

	return {
		_id: item.id.toString(),
		_rev: revMap.get(item) || '',
		type,
		name: item.content === type ? '' : item.content,
		start: start.valueOf(),
		end: end.valueOf(),
		location: item.group,
	};
}

/**
 * Creates a DataSet with task items from the Task database
 */
export default async function createTaskItems(
	db: PouchDB.Database<Task>,
	taskTypeDb: PouchDB.Database<TaskType>,
	revMap: RevMap,
) {
	const { rows } = await db.allDocs({ include_docs: true });

	const data = rows
		.map(({ doc }) => (doc ? taskToItem(doc, revMap) : null))
		.filter(item => item != null);
	const items: visDataSet<DataItem> = new DataSet(data);

	const listener = db.changes({ include_docs: true, live: true })
	.on('change', async (change) => {
		if (change.deleted) items.remove(change.id, 'pouch-change');
		else {
			if (!change.doc) throw new Error();
			const item = taskToItem(change.doc, revMap);
			const color = await getColor(taskTypeDb, getType(change.id));
			if (color) item.style = `--brand-primary: ${color}`;

			items.update(item, 'pouch-change');
		}
	});

	return {
		items,
		cancel() { listener.cancel(); },
	};
}
