/* eslint-disable no-param-reassign */
import { generate } from 'shortid';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import PouchDB from './utils/load-pouch.js';
import BadRequestError from './utils/bad-request.js';

export const db = new PouchDB('people');
export default Promise.all([
	db.createIndex({ index: { fields: ['role'] } }),
	db.createIndex({ index: { fields: ['name'] } }),
	db.createIndex({ index: { fields: ['email'] } }),
]).then(() => db);

db.transform({
	incoming(doc) {
		// if (!doc.name) throw new BadRequestError('Missing name property');

		if (!doc._id) doc._id = generate();
		doc.role = kebabCase(doc.role || 'none');

		if (!doc.addressMailing || !doc.addressPhysical) {
			if (!doc.addressPhysical) doc.addressPhysical = doc.addressMailing;
			else doc.addressMailing = doc.addressPhysical;
		}

		return doc;
	},
	outgoing(doc) {
		doc.role = startCase(doc.role);
		doc.workingDays = new Set(doc.workingDays);
		return doc;
	},
});
