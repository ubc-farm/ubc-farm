/* eslint-disable no-param-reassign */
import { generate } from 'shortid';
import PouchDB from './utils/load-pouch.js';

export const db = new PouchDB('tasks');

export default db.createIndex({
	index: { fields: ['type'] }
}).then(() => db);

function dateToMilli(date) {
	if (!date) return null;
	return new Date(date).getTime();
}

export function getTasksForLocation(locationID, options) {
	return db.allDocs(Object.assign({}, options, {
		startkey: locationID,
		endkey: `${locationID}\uffff`,
	}));
}

db.transform({
	incoming(doc) {
		if (!doc._id) doc._id = generate();

		doc.start_time = dateToMilli(doc.start_time);
		doc.end_time = dateToMilli(doc.end_time);

		return doc;
	},
});
