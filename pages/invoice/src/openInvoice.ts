import { parse } from 'querystring';
import { Invoice } from '@ubc-farm/databases';

export default async function openInvoice(
	db?: PouchDB.Database<Invoice>,
	query = window.location.search.slice(1),
): Promise<Invoice> {
	const { id: _id } = parse(query);
	if (!_id) {
		throw new Error('Missing ID!');
	}


	let result = { _id, _rev: '' };

	if (!db) return result;
	try {
		result = await db.get(_id);
	} catch (err) {
		if (err.status !== 404) throw err;
	}

	return result;
}
