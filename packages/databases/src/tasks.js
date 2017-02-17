/* eslint-disable no-param-reassign */
import { generate } from 'shortid';
import moment from 'moment';
import PouchDB from './utils/load-pouch.js';

export const db = new PouchDB('tasks');

export default Promise.all([
	db.createIndex({ index: { fields: ['type'] } }),
	db.createIndex({ index: { fields: ['location'] } }),
	db.createIndex({ index: { fields: ['start'] } }),
	db.createIndex({ index: { fields: ['end'] } }),
]).then(() => db);

function dateToMilli(date) {
	if (!date) return null;
	return moment(date).valueOf();
}

db.transform({
	incoming(doc) {
		if (!doc._id) doc._id = generate();

		doc.start = dateToMilli(doc.start);
		doc.end = dateToMilli(doc.end)
			|| moment(doc.start).add(1, 'hours').valueOf();

		return doc;
	},
	outgoing(doc) {
		if (doc.start) doc.start = moment(doc.start);
		if (doc.end) doc.start = moment(doc.end);
		return doc;
	}
});
