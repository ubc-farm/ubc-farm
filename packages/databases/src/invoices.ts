/* eslint-disable no-param-reassign */
import moment from 'moment';
import PouchDB from './utils/load-pouch';
import { DateNum, Index } from './utils/typedefs';

export interface Sale {
	item: string;
	description: string; // empty string by default
	unitCost: number; // stored as cents
	quantity: number;
}

export interface StoredInvoice {
	_id: number; // invoice #
	_rev: string;
	isPurchase: Index<boolean>; // if true, the invoice represents something the
	                            // farm bought instead of something the farm sold.
															// false by default.
	date: Index<DateNum | null>;
	items: Sale[];
	channel?: string;
	notes: string; // empty string by default
}

export interface Invoice extends StoredInvoice {
	date: moment|null;
}

export const db = new PouchDB<StoredInvoice>('invoices');
export default Promise.all([
	db.createIndex({ index: { fields: ['isPurchase'] } }),
	db.createIndex({ index: { fields: ['date'] } }),
]).then(() => db);

db.transform({
	incoming(doc: Invoice): StoredInvoice {
		doc.isPurchase = doc.isPurchase || false;
		doc.notes = doc.notes || '';
		doc.items = doc.items || [];

		doc.date = doc.date ? moment(doc.date).valueOf() : null;

		return doc;
	},
	outgoing(doc: StoredInvoice): Invoice {
		doc.date = doc.date ? moment(doc.date) : null;
		return doc;
	},
});
