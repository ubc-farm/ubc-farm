import { snakeCase } from 'lodash';
import { newId } from '@ubc-farm/utils';
import db from '../pouchdb.js';

export function allPeople(options) {
	if (!options.role) return db.allDocs(options);

	const { include_docs, limit, skip, descending } = options;
	const role = snakeCase(options.role);

	return db.get({
		startkey: `${role}/`,
		endkey: `${role}/\uffff`,
		include_docs,
		limit,
		skip,
		descending,
	});
}

export function getPerson(id) {
	return db.get(id);
}

export function putPerson(payload) {
	const data = Object.assign({}, payload);

	data._id = `${snakeCase(payload.role)}/${payload._id || newId('')}`;
	delete data.role;

	return db.put(data);
}
