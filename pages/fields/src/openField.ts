import { parse } from 'querystring';
import { Field } from '@ubc-farm/databases';

/**
 * Retrieves a field from database using a query string's id value
 */
export default function openField(
	db: PouchDB.Database<Field>,
	query = window.location.search.slice(1)
): Promise<Field> {
	const { id } = parse(query);
	if (id) return db.get(id);
	else return Promise.reject(null);
}
