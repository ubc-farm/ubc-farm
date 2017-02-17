/* eslint-disable no-param-reassign,no-use-before-define */
import startCase from 'lodash/startCase';
import PouchDB from './utils/load-pouch.js';
import BadRequestError from './utils/bad-request.js';

export const db = new PouchDB('task-types');
export default db.allDocs({ limit: 0 })
	.then(({ total_rows }) => {
		if (total_rows === 0) return createDefaultTypes();
	})
	.then(() => db);

db.transform({
	incoming(doc) {
		// if (!doc.color) throw new BadRequestError('Missing color property');

		return doc;
	},
	outgoing(doc) {
		doc.name = startCase(doc._id);
		return doc;
	}
});

export function createDefaultTypes() {
	return db.bulkDocs([
		{ _id: 'seeding', color: '#33691e' },
		{ _id: 'irrigation', color: '#01579b' },
		{ _id: 'pest-control', color: '#b71c1c' },
		{ _id: 'transplanting', color: '#827717' },
		{ _id: 'soil-sampling', color: '#3e2723' },
		{ _id: 'scouting:-harvest', color: '#311b92' },
		{ _id: 'scouting:-pests', color: '#880e4f' },
		{ _id: 'fertilizing', color: '#275b29' },
	]);
}
