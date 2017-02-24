import * as PouchDB from 'pouchdb';
import moment from 'moment';
import * as React from 'react';

export type ID = string;
export type Index<T> = T;
export type DateNum = number;
export type DateString = string;
export type Cents = number;
export interface Address {
	addressCountry: string;
	addressLocality: string;
	addressRegion: string;
	postalCode: string;
	streetAddress: string;
}
export enum Day {
	sunday = 0,
	monday = 1,
	tuesday = 2,
	wednesday = 3,
	thursday = 4,
	friday = 5,
	saturday = 6
}

///////////////////////////

interface ConnectAllOptions {
	rowKey?: string;
	loadingKey?: string;
	changes?: boolean;
	useMap?: boolean;
	getDisplayName?: (name: string) => string;
	allDocsOptions?: PouchDB.Core.AllDocsOptions;
	changesOptions?: PouchDB.Core.AllDocsOptions;
}

export function connectAll<P, T>(
	transformer?: (doc: any, id: string) => T,
	options?: ConnectAllOptions
): (WrappedComponent: React.SFC<P>) => React.Component<P & { db: PouchDB.Database<T> }, any>
export function connectAll<P>(
	options?: ConnectAllOptions
): (WrappedComponent: React.SFC<P>) => React.Component<P, any>

///////////////////////////

export interface Equipment {
	_id: ID;
	_rev: string;
	name: string;
}

export interface Sale {
	item: string;
	description: string;
	unitCost: number;
	quantity: number;
}

export interface Invoice {
	_id: number;
	_rev: string;
	isPurchase: Index<boolean>;
	date: Index<DateNum | moment.Moment | null>;
	items: Sale[];
	channel?: string;
	notes: string;
}

export interface Location {
	_id: string;
	_rev: string;
	name: Index<string>;
	geometry?: Object;
	location?: Index<string | number[]>;
}

export interface Field extends Location {
	name: string;
	area?: number;
	crop?: {
		variety: Index<string>;
		quantity: number;
	};
}

export interface LongTermEntry {
	_id: DateString;
	_rev: string;
	numEmployed: number;
	waterUsed: number;
	revenue: Cents;
	expenses: Cents;
}

export interface Person {
	_id: ID;
	_rev: string;
	role: Index<string>;
	name: Index<string>;
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
	workingDays?: Day[];
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

export interface Plant {
	_id: string;
	_rev: string;
	commodity: Index<string>;
	refuse: {
		name: string;
		percent: number;
	} | null;
	lipid: number;
	energy: number;
	calcium: number;
	magnesium: number;
	ph: number;
	potassium: number;
	sodium: number;
	zinc: number;
	copper: number;
	flerovium: number;
	manganese: number;
	selenium: number;
	vitA: number;
	vitA_RAE: number;
	betaC: number;
	alphaC: number;
	vitE: number;
	crypto: number;
	lycopene: number;
	lutein: number;
	betaT: number;
	gammaT: number;
	deltaT: number;
	vitC: number;
	thiamin: number;
	riboflavin: number;
	niacin: number;
	pantothenic: number;
	vitB6: number;
	folate: number;
	vitB12: number;
	vitK: number;
}

export interface TaskType {
	_id: string; // Type name
	_rev: string;
	color: string;
	name?: string;
}

export interface Task {
	_id: ID;
	_rev: string;
	type: Index<ID>;
	location: Index<ID>;
	name?: string;
	start?: Index<DateNum> | moment.Moment;
	end?: Index<DateNum> | moment.Moment;
	allDay?: boolean;
	done?: boolean;
}

///////////////////////////

export function getEquipment(): Promise<PouchDB.Database<Equipment>>;
export function getInvoices(): Promise<PouchDB.Database<Invoice>>;
export function getLocations(): Promise<PouchDB.Database<Location>>;
export function getLongTerm(): Promise<PouchDB.Database<LongTermEntry>>;
export function getPeople(): Promise<PouchDB.Database<Person>>;
export function getTaskTypes(): Promise<PouchDB.Database<TaskType>>;
export function getTasks(): Promise<PouchDB.Database<Task>>;

///////////////////////////

type LocationDescription = string | number[] | null;

export function getLocation(loc: Location): LocationDescription
export function getLocationString(loc: Location | LocationDescription): string
export function getArea(field: Field): number | null;
export function getAcres(field: Field | number | null): string;

export function generateToday(): Promise<void>;
export function createDefaultTypes(db: PouchDB.Database<TaskType>): Promise<void>;
