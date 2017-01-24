import { allPeople, getPerson, putPerson } from './people.js';

export function allResearchers(options) {
	const opts = Object.assign({}, options);
	opts.role = 'researcher';
	return allPeople(opts);
}

export function getResearcher(id) {
	return getPerson(`researcher/${id}`);
}

export function putResearcher(payload) {
	const data = Object.assign({}, payload);
	data.role = 'researcher';
	if (typeof payload.coursesTaught !== 'string') {
		data.coursesTaught = payload.coursesTaught.split(/\\r?\\n/);
	}

	return putPerson(data);
}

