/* eslint-disable no-param-reassign */
import moment from 'moment';
import PouchDB from './utils/load-pouch.js';
import people from './people.js';

export const db = new PouchDB('long-term');
export default Promise.resolve(db);

async function countEmployees() {
	const { docs } = await people.find({
		selector: { role: 'employee' },
		fields: [],
	});

	return docs.length;
}

/**
 * Reads current data to generate an entry for today.
 */
export async function generateToday() {
	const today = moment().format('Y-MM-DD');
	const [numEmployed] = Promise.all([countEmployees()]);

	let doc;
	try {
		doc = await db.get(today);
	} catch (err) {
		if (err.name !== 'not_found') throw err;
		doc = { _id: today };
	}

	Object.assign(doc, { numEmployed });
	return db.put(doc);
}
