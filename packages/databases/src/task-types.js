/* eslint-disable no-param-reassign */
import PouchDB from './utils/load-pouch.js';
import BadRequestError from './utils/bad-request.js';

export const db = new PouchDB('task-types');
export default Promise.resolve(db);

db.transform({
	incoming(doc) {
		if (!doc.color) throw new BadRequestError('Missing color property');

		return doc;
	}
});
