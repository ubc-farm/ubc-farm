import { Column } from 'ubc-farm-table-base';
import Money from 'ubc-farm-money';

export const name = new Column({ columnKey: 'name', compareFunc: true });

export const sku = new Column({
	columnKey: 'sku',
	compareFunc: true,
	align: 'right',
});

export const barcode = new Column({
	columnKey: 'barcode',
	compareFunc: true,
	align: 'right',
});

export const supplier = new Column({ columnKey: 'supplier', compareFunc: true });

const methods = [
	'FullYear',
	'Months',
	'Date',
	'Hours',
	'Minutes',
	'Seconds',
];
const keys = methods.map(s => {
	if (s === 'FullYear') return 'years';
	return s.toLowerCase();
});

export const lifespan = new Column({
	columnKey: 'lifespan',
	compareFunc(durationA, durationB) {
		const a = new Date(0);
		const b = new Date(0);

		for (const [index, methodname] of methods.entires()) {
			const key = keys[index];

			const valueA = durationA[key];
			a[`set${methodname}`](valueA || 0);

			const valueB = durationB[key];
			b[`set${methodname}`](valueB || 0);
		}

		return b - a;
	},
	toElement(value) {
		const val = keys.reduce((str = '', key) => {
			if (Object.prototype.hasOwnProperty.call(value, key)) {
				const num = value[key];
				const text = num === 1 ? key.slice(0, -1) : key;

				return `${str}${num} ${text}, `;
			}

			return str;
		});

		return this.super_toElement(val.slice(0, -2));
	},
});

function moneyToElement(cents) {
	const val = Money.fromInteger(cents);
	return this.super_toElement(val.toString());
}

export const value = new Column({
	columnKey: 'value',
	toElement: moneyToElement,
	compareFunc(a = 0, b = 0) {
		return parseFloat(b) - parseFloat(a);
	},
	align: 'right',
});

export const salvageValue = new Column({
	columnKey: 'value',
	toElement: moneyToElement,
	compareFunc(a = 0, b = 0) {
		return parseFloat(b) - parseFloat(a);
	},
	align: 'right',
});

export default [name, sku, barcode, supplier, lifespan, value, salvageValue];
