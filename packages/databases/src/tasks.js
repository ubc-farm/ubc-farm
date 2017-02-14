/* eslint-disable no-param-reassign */
import { generate } from 'shortid';
import { route } from 'docuri';
import PouchDB from './utils/load-pouch.js';

export const uri = route(':location/:hash');

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
		const { _id } = doc;

		const isDocURI = _id && uri(_id);
		if (!isDocURI) {
			const { location = ' ', hash = _id || generate() } = doc;
			doc._id = uri({ location, hash });
			delete doc.location;
			delete doc.hash;
		}

		doc.start_time = dateToMilli(doc.start_time);
		doc.end_time = dateToMilli(doc.end_time);

		return doc;
	},
	outgoing(doc) {
		return Object.assign(doc, uri(doc._id));
	}
});
