/* eslint-disable no-param-reassign */
import { generate } from 'shortid';
import PouchDB from './utils/load-pouch.js';
import BadRequestError from './utils/bad-request.js';

export const db = new PouchDB('directory');
export default Promise.all([
	db.createIndex({ index: { fields: ['role'] } }),
	db.createIndex({ index: { fields: ['name'] } }),
	db.createIndex({ index: { fields: ['email'] } }),
]).then(() => db);

db.transform({
	incoming(doc) {
		if (!doc.name) throw new BadRequestError('Missing name property');

		if (!doc._id) doc._id = generate();
		if (!doc.role) doc.role = 'none';

		if (!doc.addressMailing || !doc.addressPhysical) {
			if (!doc.addressPhysical) doc.addressPhysical = doc.addressMailing;
			else doc.addressMailing = doc.addressPhysical;
		}

		return doc;
	},
	outgoing(doc) {
		doc.workingDays = new Set(doc.workingDays);
		return doc;
	},
});
