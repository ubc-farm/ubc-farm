import { createSelector } from 'reselect';
import { Money } from 'ubc-farm-utils';
import columnList, { price } from '../columnlist.js';

/** @returns {Map<K, WeakMap>} */
export const dataSelector = state => state.data;

/** @returns {Column[]} */
export const columnSelector = () => columnList;
/** @returns {Column} */
export const totalColumnSelector = () => price;
/** @returns {number} */
export const vatSelector = () => 0;

/** @returns {Money} */
export const amountPaidSelector = state => state.amountPaid;
/** @returns {Set<K>} */
export const selectedSelector = state => state.selected;

/** @returns {number} */
export const dataLengthSelector = createSelector(
	dataSelector,
	data => data.size
);

/** @returns {number} */
export const selectedLengthSelector = createSelector(
	selectedSelector,
	selected => selected.size
);

/** @returns {Money} */
export const subtotalSelector = createSelector(
	dataSelector,
	totalColumnSelector,
	(data, totalColumn) => {
		let total = 0;
		for (const row of data.values()) {
			const value = totalColumn.getValue(row);
			if (value !== undefined && !Money.isNaN(value)) total += value;
		}
		return new Money(total);
	}
);

/** @returns {Money} */
export const totalSelector = createSelector(
	subtotalSelector,
	vatSelector,
	(subtotal, VAT) => new Money(subtotal * (VAT + 1))
);

/** @returns {Money} */
export const balanceDueSelector = createSelector(
	totalSelector,
	amountPaidSelector,
	(total, amountPaid) => new Money(total - amountPaid)
);

export const calculatePositionOffset = createSelector(
	totalColumnSelector,
	columnSelector,
	(totalColumn, allColumns) => {
		const index = allColumns.findIndex(c => totalColumn === c);

		return {
			leftPad: index + 1,
			rightPad: allColumns.length - index - 1,
		};
	}
);
