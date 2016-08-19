import { createElement as h } from 'react'; /** @jsx h */
import { Money } from 'ubc-farm-utils/index.js';
import { Column } from 'ubc-farm-table-base/index.js';

import InvoiceInput from './inputs/base.js';
import UnitCostInput from './inputs/unit-cost.js';

export const item = new Column({
	columnKey: 'item',
	compareFunc: true,
	toElement(value, rowKey) {
		const props = Object.assign({}, this.toJSON(), { header: true, scope: 'row' });
		return this.super_toElement(
			<InvoiceInput
				spellCheck
				placeholder="Squash, kg"
				rowKey={rowKey} column={this}
			/>
		, rowKey, props);
	},
});

export const description = new Column({
	columnKey: 'description',
	compareFunc: true,
	toElement(value, rowKey) {
		const random1to10 = Math.ceil(Math.random() * 10);
		return this.super_toElement(
			<InvoiceInput
				spellCheck
				placeholder={`Squash variety ${random1to10}, kg`}
				rowKey={rowKey} column={this}
			/>
		);
	},
});

export const unitCost = new Column({
	columnKey: 'unitCost',
	title: 'Unit Cost ($)',
	description: 'Cost per unit of this item',
	getValue(rowData) {
		const cents = this.super_getValue(rowData);
		return new Money(cents);
	},
	compareFunc(a = 0, b = 0) {
		return b - a;
	},
	align: 'right',
	toElement(value, rowKey) {
		const randomMoney = new Money(Math.trunc(Math.random() * 50000));

		return this.super_toElement(
			<UnitCostInput
				placeholder={String(randomMoney)}
				rowKey={rowKey} column={this}
			/>
		);
	},
});

export const quantity = new Column({
	columnKey: 'quantity',
	compareFunc: true,
	align: 'right',
	toElement(value, rowKey) {
		return this.super_toElement(
			<InvoiceInput
				type="number" step="any"
				style={{ maxWidth: '5em' }}
				placeholder={Math.trunc(Math.random() * 100).toString()}
				rowKey={rowKey} column={this}
			/>
		);
	},
});

const priceValueCache = new WeakMap();
export const price = new Column({
	columnKey: 'price',
	title: 'Price ($)',
	getValue(rowData) {
		if (priceValueCache.has(rowData)) return priceValueCache.get(rowData);

		const unitCostValue = rowData.get(unitCost);
		const unitCostInt = unitCostValue ? unitCostValue.toInteger() : NaN;

		const total = unitCostInt * rowData.get(quantity);
		if (Number.isNaN(total)) return undefined;

		const result = Money.fromInteger(total);
		priceValueCache.set(rowData, result);
		return result;
	},
	compareFunc: (a = 0, b = 0) => b - a,
	toElement(value) {
		const str = value === undefined ? null : value.toString();
		return this.super_toElement(str);
	},
	align: 'right',
});

export default [item, description, unitCost, quantity, price];
