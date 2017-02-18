import PouchDB from 'pouchdb';
import { parse } from 'querystring';

/**
 * Retrieves a field from database using a query string's id value
 */
export default function openField(
	db: PouchDB,
	query = window.location.search.slice(1)
): Promise<Object|null> {
	const { id } = parse(query);
	if (id) return db.get(id);
	else return Promise.reject(null);
}
