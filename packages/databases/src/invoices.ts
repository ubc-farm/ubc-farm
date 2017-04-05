/* eslint-disable no-param-reassign */
import moment from 'moment';
import Pouch from './utils/load-pouch';
import { DateNum, Index, Cents } from './utils/typedefs';

export interface Sale {
	item?: string;
	description?: string; // empty string by default
	unitCost?: Cents;
	quantity?: number;
}

export interface Invoice {
	_id: number; // invoice #
	_rev: string;
	isPurchase?: Index<boolean>; // if true, the invoice represents something the
	                             // farm bought instead of something the farm sold.
															 // false by default.
	date?: Index<DateNum | null>;
	items?: Sale[];
	channel?: string;
	notes?: string; // empty string by default
	amountPaid?: Cents;
	deliveryDate?: Index<DateNum | null>;
}

/**
 * Returns the total price of a sale in cents
 */
export function salePrice(sale: Partial<Sale>): Cents {
	return (sale.unitCost || 0) * (sale.quantity || 0);
}

/**
 * Calculates the subtotal for an invoice
 */
export function computeSubtotal(invoice: Partial<Invoice> | Sale[]): Cents {
	const sales = Array.isArray(invoice) ? invoice : (invoice.items || []);
	return sales.reduce((total, sale) => total + salePrice(sale), 0);
}

/**
 * Calculate total, including VAT tax
 * @param {number} vat - percentage, such as 0.04 for 4% tax.
 */
export function computeTotal(invoice: Partial<Invoice> | Sale[], vat: number): Cents {
	if (typeof vat !== 'number') throw new TypeError(`Invalid VAT ${vat}`);
	return computeSubtotal(invoice) * (1 + vat);
}

/**
 * Gets the balance due
 * @param {number} [vat] - percentage, such as 0.04 for 4% tax. If omitted,
 * the subtotal is used for calculations instead.
 */
export function balanceDue(invoice: Partial<Invoice>, vat: number = 0): Cents {
	return computeTotal(invoice, vat) - (invoice.amountPaid || 0);
}

/**
 * Returns the invoice date as a moment
 */
export function getInvoiceDate(invoice: Partial<Invoice>) {
	if (invoice.date) return moment(invoice.date);
	else return null;
}

/**
 * Returns the delivery date as a moment
 */
export function getInvoiceDeliveryDate(invoice: Partial<Invoice>) {
	if (invoice.deliveryDate) return moment(invoice.deliveryDate);
	else return null;
}

export default async function getInvoices(prefix = '', PouchDB = Pouch) {
	const db = new PouchDB<Invoice>(prefix + 'invoices');
	await Promise.all([
		db.createIndex({ index: { fields: ['isPurchase'] } }),
		db.createIndex({ index: { fields: ['date'] } }),
	]);

	return db;
}
