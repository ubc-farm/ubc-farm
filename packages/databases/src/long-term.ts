/* eslint-disable no-param-reassign */
import moment from 'moment';
import PouchDB from './utils/load-pouch';
import getPeople from './people';
import { DateString, Cents } from './utils/typedefs';

export interface LongTermEntry {
	_id: DateString;
	_rev: string;
	numEmployed: number;
	waterUsed: number; // in liters
	revenue: Cents;
	expenses: Cents;
}

const db = new PouchDB<LongTermEntry>('long-term');

export default async function getLongTerm() {
	return db;
}

async function countEmployees(): Promise<number> {
	const people = await getPeople();
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
	const [numEmployed] = await Promise.all([countEmployees()]);

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
