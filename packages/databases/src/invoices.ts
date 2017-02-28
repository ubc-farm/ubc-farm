/* eslint-disable no-param-reassign */
import moment from 'moment';
import PouchDB from './utils/load-pouch';
import { DateNum, Index, Cents } from './utils/typedefs';

export interface Sale {
	item: string;
	description: string; // empty string by default
	unitCost: Cents;
	quantity: number;
}

export interface Invoice {
	_id: number; // invoice #
	_rev: string;
	isPurchase: Index<boolean>; // if true, the invoice represents something the
	                            // farm bought instead of something the farm sold.
															// false by default.
	date?: Index<DateNum | null>;
	items: Sale[];
	channel?: string;
	notes: string; // empty string by default
	amountPaid: Cents;
	deliveryDate?: Index<DateNum | null>;
}

/**
 * Returns the total price of a sale in cents
 */
export function salePrice(sale: Sale): Cents {
	return sale.unitCost * sale.quantity;
}

/**
 * Calculates the subtotal for an invoice
 */
export function computeSubtotal(invoice: Invoice | Sale[]): Cents {
	const sales = Array.isArray(invoice) ? invoice : invoice.items;
	return sales.reduce((total, sale) => total + salePrice(sale), 0);
}

/**
 * Calculate total, including VAT tax
 * @param {number} vat - percentage, such as 0.04 for 4% tax.
 */
export function computeTotal(invoice: Invoice | Sale[], vat: number): Cents {
	return computeSubtotal(invoice) * (1 + vat);
}

/**
 * Gets the balance due
 * @param {number} [vat] - percentage, such as 0.04 for 4% tax. If omitted,
 * the subtotal is used for calculations instead.
 */
export function balanceDue(invoice: Invoice, vat: number = 0): Cents {
	return computeTotal(invoice, vat) - invoice.amountPaid;
}

/**
 * Returns the invoice date as a moment
 */
export function getInvoiceDate(invoice: Invoice) {
	if (invoice.date) return moment(invoice.date);
	else return null;
}

/**
 * Returns the delivery date as a moment
 */
export function getInvoiceDeliveryDate(invoice: Invoice) {
	if (invoice.deliveryDate) return moment(invoice.deliveryDate);
	else return null;
}

export default async function getInvoices() {
	const db = new PouchDB<Invoice>('invoices');
	await Promise.all([
		db.createIndex({ index: { fields: ['isPurchase'] } }),
		db.createIndex({ index: { fields: ['date'] } }),
	]);

	db.transform({
		incoming(doc: Invoice): Invoice {
			doc.isPurchase = doc.isPurchase || false;
			doc.notes = doc.notes || '';
			doc.items = doc.items || [];
			doc.amountPaid = doc.amountPaid || 0;

			for (const sale of doc.items) {
				sale.description = sale.description || '';
				sale.quantity = sale.quantity || 0;
				sale.unitCost = sale.unitCost || 0;
			}

			return doc;
		},
		outgoing(doc: Invoice): Invoice {
			return doc;
		},
	});

	return db;
}
