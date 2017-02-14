/* eslint-disable no-param-reassign */
import { generate } from 'shortid';
import PouchDB from './utils/load-pouch.js';

export const db = new PouchDB('tasks');

export default Promise.all([
	db.createIndex({ index: { fields: ['type'] } }),
	db.createIndex({ index: { fields: ['location'] } }),
	db.createIndex({ index: { fields: ['start_time'] } }),
	db.createIndex({ index: { fields: ['end_time'] } }),
]).then(() => db);

function dateToMilli(date) {
	if (!date) return null;
	return new Date(date).getTime();
}

db.transform({
	incoming(doc) {
		if (!doc._id) doc._id = generate();

		doc.start_time = dateToMilli(doc.start_time);
		doc.end_time = dateToMilli(doc.end_time);

		return doc;
	},
});
