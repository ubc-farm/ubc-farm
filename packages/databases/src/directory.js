/* eslint-disable no-param-reassign */
import { generate } from 'shortid';
import { route } from 'docuri';
import PouchDB from './utils/load-pouch.js';

export const uri = route(':role/:name/:hash');

export const db = new PouchDB('directory');
export default Promise.resolve(db);

db.transform({
	incoming(doc) {
		const { _id } = doc;

		const isDocURI = _id && uri(_id);
		if (!isDocURI) {
			const { role = 'none', name, hash = _id || generate() } = doc;
			doc._id = uri({ role, name, hash });
			delete doc.role;
			delete doc.name;
			delete doc.hash;
		}

		if (!doc.addressMailing || !doc.addressPhysical) {
			if (!doc.addressPhysical) doc.addressPhysical = doc.addressMailing;
			else doc.addressMailing = doc.addressPhysical;
		}

		return doc;
	},
	outgoing(doc) {
		return Object.assign(doc, uri(doc._id));
	}
});
