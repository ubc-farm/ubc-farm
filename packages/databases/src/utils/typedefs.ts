export type ID = string;
export type Index<T> = T; // Indicates a property is an index of the database
export type DateNum = number; // date as unix timestamp in milliseconds
export type DateString = string; // Y-MM-DD string representing date
export type Cents = number; // money represented as cents
export interface Address {
	addressCountry: string; // ie: USA, Canada
	addressLocality: string; // ie: Mountain View
	addressRegion: string; // ie: CA, BC
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
