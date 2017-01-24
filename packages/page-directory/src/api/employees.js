import { floatToCents } from '@ubc-farm/money';
import { allPeople, getPerson, putPerson } from './people.js';

export function allEmployees(options) {
	const opts = Object.assign({}, options);
	opts.role = 'employee';
	return allPeople(opts);
}

export function getEmployee(id) {
	return getPerson(`employee/${id}`);
}

export function putEmployee(payload) {
	const data = Object.assign({}, payload);
	data.pay = floatToCents(payload.pay);
	data.role = 'employee';

	return putPerson(data);
}
