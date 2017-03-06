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
	useArray?: boolean;
	getDisplayName?: (name: string) => string;
	allDocsOptions?: PouchDB.Core.AllDocsWithKeyOptions | PouchDB.Core.AllDocsWithKeysOptions | PouchDB.Core.AllDocsWithinRangeOptions;
	changesOptions?: PouchDB.Core.ChangesOptions;
}

export function connectAll<Content, Value>(
	transformer?: (doc: Content, id: string) => Value | null | undefined,
	options?: ConnectAllOptions
): (WrappedComponent: React.ReactType) => React.ComponentClass<any>
export function connectAll<Content>(
	options?: ConnectAllOptions
): (WrappedComponent: React.ReactType) => React.ComponentClass<any>

///////////////////////////

export interface Equipment {
	_id: ID;
	_rev: string;
	name?: string;
}

export interface Sale {
	item?: string;
	description?: string;
	unitCost?: number;
	quantity?: number;
}

export interface Invoice {
	_id: number;
	_rev: string;
	isPurchase?: Index<boolean>;
	date?: Index<DateNum | null>;
	items?: Sale[];
	channel?: string;
	notes?: string;
	amountPaid?: Cents;
	deliveryDate?: Index<DateNum | null>;
}

export interface Location {
	_id: string;
	_rev: string;
	name?: Index<string>;
	geometry?: GeoJSON.Polygon | GeoJSON.Point;
	location?: Index<string | number[]>;
}

export interface Field extends Location {
	name?: string;
	geometry?: GeoJSON.Polygon;
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
	role?: Index<string>;
	name?: Index<string>;
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
}

export interface Task {
	_id: ID;
	_rev: string;
	type?: Index<ID>;
	location?: Index<ID>;
	name?: string;
	start?: Index<DateNum>;
	end?: Index<DateNum>;
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
type NearlyLocation = {
	location?: string | number[];
	geometry?: GeoJSON.GeometryObject;
} | Location
type NearlyField = {
	area?: number;
	geometry?: GeoJSON.Polygon;
} | Field

export function salePrice(sale: Sale): Cents;
export function computeSubtotal(invoice: Invoice | Sale[]): Cents;
export function computeTotal(invoice: Invoice | Sale[], vat: number): Cents;
export function balanceDue(invoice: Invoice, vat?: number): Cents;
export function getInvoiceDate(invoice: Invoice): moment.Moment | null;
export function getInvoiceDeliveryDate(invoice: Invoice): moment.Moment | null;

export function getLocation(loc: NearlyLocation): LocationDescription
export function getLocationString(loc: NearlyLocation | LocationDescription): string
export function getArea(field: NearlyField): number | null;
export function getAcres(field: NearlyField | number | null): string;

export function generateToday(): Promise<void>;

export function getRole(person: Person | string): string;

export function taskTypeName(taskType: TaskType | string): string;
export function createDefaultTypes(db: PouchDB.Database<TaskType>): Promise<void>;

export function getTaskStart(task: Task): moment.Moment | null;
export function getTaskEnd(task: Task): moment.Moment | null;
export function getTaskRange(task: Task): moment.Moment[] | null;
