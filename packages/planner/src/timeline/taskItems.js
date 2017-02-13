import { DataSet } from 'vis-timeline';

function getType(id) {
	return id.slice(0, id.indexOf('/'));
}

function getColor(taskTypeDb, id) {
	return taskTypeDb.get(id).then(doc => doc.color);
}

function toEntry({ doc }) {
	const { _id, _rev, name, start_time, end_time, location } = doc;
	const type = getType(_id);
	return {
		id: _id,
		_rev,
		content: name || type,
		start: start_time,
		end: end_time,
		group: location,
		className: type,
		type: 'box',
	};
}

/**
 * @param {PouchDB} db - Task database
 * @param {PouchDB} taskTypeDb - TaskType database
 * @returns {Promise<vis.DataSet>}
 */
export default async function createTaskItems(db, taskTypeDb) {
	const { rows } = await db.allDocs({ include_docs: true });

	const data = rows.map(toEntry);
	const items = new DataSet(data);

	const listener = db.changes({ include_docs: true, live: true })
	.on('change', async (change) => {
		if (change.deleted) items.remove(change.id, 'pouch-change');
		else {
			const item = toEntry(change);
			const color = await getColor(taskTypeDb, getType(change.id));
			if (color) item.style = `--brand-primary: ${color}`;

			items.update(item, 'pouch-change');
		}
	});

	items.cancel = () => listener.cancel();
	return items;
}
