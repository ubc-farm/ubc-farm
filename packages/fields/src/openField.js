import { parse } from 'querystring';

/**
 * Retrieves a field from database using a query string's id value
 * @returns {Promise<Object>}
 */
export default function openField(db, query = window.location.search.slice(1)) {
	const { id } = parse(query);
	if (id) return db.get(id);
	else return Promise.reject();
}
