import { generate } from 'shortid';
import { route } from 'docuri';
import PouchDB from './utils/load-pouch.js';

const uri = route(':type/:location/:hash');

export const db = new PouchDB('tasks');
export default Promise.resolve(db);

function dateToMilli(date) {
	if (!date) return null
	return new Date(date).getTime();
}

db.transform({
	incoming(doc) {
		const { _id } = doc;

		const isDocURI = _id && uri(_id);
		if (!isDocURI) {
			const { type = ' ', location = ' ', hash = _id || generate() } = doc;
			doc._id = uri({ type, location, hash });
			delete doc.type;
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
