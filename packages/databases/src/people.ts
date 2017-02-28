/* eslint-disable no-param-reassign */
import phone from 'phone';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import PouchDB from './utils/load-pouch';
import { ID, Index, Address, Day, DateString } from './utils/typedefs';

export interface Person {
	_id: ID;
	_rev: string;
	role: Index<string>; // employee, researcher, or something else. Default is 'none'
	name: Index<string>; // First Last
	email?: Index<string>;
	phone?: {
		country: string;
		number: string;
	};
	addressMailing?: string|Address;
	addressPhysical?: string|Address;
}

export interface Employee extends Person {
	role: 'employee';
	pay?: number;
	employmentType?: 'fullTime' | 'partTime';
	holidayDays?: DateString[];
	sickDays?: DateString[];
	paidLeaveDays?: DateString[];
	inLieHours?: DateString[];
	medicalLeaveTime?: Object;
	emergencyContact?: Person;
	workingDays?: Day[]; // set of days, should be unique
}

export interface Researcher extends Person {
	role: 'researcher';
	position?: string;
	faculty?: string;
	department?: string;
	labWebsite?: string;
	expertise?: string;
	coursesTaught?: string;
	projects?: string;
}

/**
 * Returns the role of the person in Start Case.
 * @param {Person|string} person or the role as a string
 */
export function getRole(person: Person | string) {
	const role = typeof person === 'string' ? person : person.role
	return startCase(role);
}

export default async function getPeople() {
	const db = new PouchDB<Person>('people');
	await Promise.all([
		db.createIndex({ index: { fields: ['role'] } }),
		db.createIndex({ index: { fields: ['name'] } }),
		db.createIndex({ index: { fields: ['email'] } }),
	]);

	db.transform({
		incoming(doc: Person & { phoneNumber: string }): Person {
			doc.role = kebabCase(doc.role || 'none');

			if (doc.phoneNumber) {
				doc.phone = { country: 'CA', number: doc.phoneNumber };
				delete doc.phoneNumber;
			}

			if (doc.phone) {
				const [num, country] = phone(doc.phone.number, doc.phone.country);
				doc.phone.number = num;
				doc.phone.country = country;
			}

			return doc;
		},
		outgoing(doc: Person): Person {
			return doc;
		},
	});

	return db;
}
