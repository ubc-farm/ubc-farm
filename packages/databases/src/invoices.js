/* eslint-disable no-param-reassign */
import moment from 'moment';
import PouchDB from './utils/load-pouch.js';

export const db = new PouchDB('invoices');
export default Promise.all([
	db.createIndex({ index: { fields: ['isPurchase'] } }),
	db.createIndex({ index: { fields: ['date'] } }),
]).then(() => db);

db.transform({
	incoming(doc) {
		doc.isPurchase = doc.isPurchase || false;
		doc.notes = doc.notes || '';
		doc.items = doc.items || [];

		doc.date = doc.date ? moment(doc.date).valueOf() : null;

		return doc;
	},
	outgoing(doc) {
		doc.date = doc.date ? moment(doc.date) : null;
		return doc;
	},
});
