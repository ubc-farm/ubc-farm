import * as PouchDB from 'pouchdb';
import { Location } from '@ubc-farm/databases';
import { DataGroup, DataSet as visDataSet } from 'vis';

import { DataSet } from 'vis-timeline';

//const groupRevs = new WeakMap<DataGroup, string>();

function locationToGroup(doc: Location): DataGroup {
	const group = {
		id: doc._id,
		content: doc.name,
	};

	//groupRevs.set(group, doc._rev);
	return group;
}

/**
 * Creates DataGroups using location database(s). Treats the database(s) as
 * read-only.
 */
export default async function createLocationGroups(...dbs: PouchDB.Database<Location>[]) {
	const results = await Promise.all(
		dbs.map(db => db.allDocs({ include_docs: true }))
	);

	const data: DataGroup[] = [];
	for (const { rows } of results) {
		data.push(...rows.map(row => locationToGroup(row.doc)));
	}

	const groups: visDataSet<DataGroup> = new DataSet(data);

	const listeners = dbs.map(db =>
		db.changes({ include_docs: true, live: true })
		.on('change', (change) => {
			if (change.deleted) groups.remove(change.id, 'pouch-change');
			else groups.update(locationToGroup(change.doc), 'pouch-change');
		})
	);

	const cancel = () => listeners.forEach(listener => listener.cancel());

	return { groups, cancel };
}
