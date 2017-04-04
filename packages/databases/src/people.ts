/* eslint-disable no-param-reassign */
import phone from 'phone';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import Pouch from './utils/load-pouch';
import { ID, Index, Address, Day, DateString } from './utils/typedefs';

export interface Person {
	_id: ID;
	_rev: string;
	role?: Index<string>; // employee, researcher, or something else. Default is 'none'
	name?: Index<string>; // First Last
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
	medicalLeaveTime?: object;
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
export function getRole(person: Partial<Person> | string) {
	const role = typeof person === 'string' ? person : (person.role || 'none');
	return startCase(role);
}

export function setPhone(person: Partial<Person>, number: string): void
export function setPhone(
	person: Partial<Person>, phone: { number: string, country: string }
): void
export function setPhone(
	doc: Partial<Person>, _phone: string | { number: string, country: string }
): void {
	if (typeof _phone === 'string') {
		doc.phone = { country: 'CA', number: _phone };
	} else if (typeof _phone === 'object') {
		const [number, country] = phone(_phone.number, _phone.country);
		doc.phone = { country, number };
	}
}

export default async function getPeople(prefix = '', PouchDB = Pouch) {
	const db = new PouchDB<Person>(prefix + 'people');
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
	});

	return db;
}
