import { DataSet } from 'vis-timeline';

function toEntry({ doc }) {
	return {
		id: doc._id,
		_rev: doc._rev,
		content: doc.name,
	};
}

/**
 * @param {...PouchDB} dbs - Location databases
 * @returns {Promise<vis.DataSet>}
 */
export default async function createLocationGroups(...dbs) {
	const results = await Promise.all(
		dbs.map(db => db.allDocs({ include_docs: true }))
	);

	const data = [];
	for (const { rows } of results) {
		data.push(...rows.map(toEntry));
	}

	const groups = new DataSet(data);

	const listeners = dbs.map(db =>
		db.changes({ include_docs: true, live: true })
		.on('change', (change) => {
			if (change.deleted) groups.remove(change.id, 'pouch-change');
			else groups.update(toEntry(change), 'pouch-change');
		})
	);
	groups.cancel = () => listeners.forEach(listener => listener.cancel());

	return groups;
}
