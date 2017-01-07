import PouchDB from 'pouchdb';
import moment from 'moment';

const longTermDB = new PouchDB('long-term');
const peopleDB = new PouchDB('people');

function countEmployees() {
	return peopleDB.allDocs({
		startkey: 'people/employees',
		endkey: 'people/employees\uffff',
		limit: 0,
	}).then(data => data.total_rows);
}

export default async function generateLongTermData() {
	const today = moment().format('Y-MM-DD');
	const [numEmployed] = await Promise.all([
		countEmployees(),
	]);

	let doc;
	try {
		doc = await longTermDB.get(today);
	} catch (err) {
		if (err.name === 'not_found') doc = { _id: today };
		else throw err;
	}

	Object.assign(doc, { numEmployed });
	return longTermDB.put(doc);
}
