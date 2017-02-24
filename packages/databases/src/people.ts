/* eslint-disable no-param-reassign */
import phone from 'phone';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import PouchDB from './utils/load-pouch';
import { ID, Index, Address, Day } from './utils/typedefs';

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
	holidayDays?: Date[];
	sickDays?: Date[];
	paidLeaveDays?: Date[];
	inLieHours?: Date[];
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

			if (!doc.addressMailing || !doc.addressPhysical) {
				if (!doc.addressPhysical) doc.addressPhysical = doc.addressMailing;
				else doc.addressMailing = doc.addressPhysical;
			}

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
			doc.role = startCase(doc.role);
			return doc;
		},
	});

	return db;
}
