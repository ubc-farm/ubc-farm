/* eslint-disable no-param-reassign */
import moment from 'moment';
import Pouch from './utils/load-pouch';
import getPeople from './people';
import { DateString, Cents } from './utils/typedefs';

export interface LongTermEntry {
	_id: DateString;
	_rev?: string;
	numEmployed: number;
	waterUsed?: number; // in liters
	revenue?: Cents;
	expenses?: Cents;
}

export default async function getLongTerm(prefix = '', PouchDB = Pouch) {
	const db = new PouchDB<LongTermEntry>(prefix + 'long-term');
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
export async function generateToday(db: PouchDB.Database<LongTermEntry>) {
	const today = moment().format('Y-MM-DD');
	const [numEmployed] = await Promise.all([countEmployees()]);

	let base;
	try {
		base = await db.get(today);
	} catch (err) {
		if (err.name !== 'not_found') throw err;
		base = { _id: today };
	}

	const doc = Object.assign(base, { numEmployed });
	return db.put(doc);
}
