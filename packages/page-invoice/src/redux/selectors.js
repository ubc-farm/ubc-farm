import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import Money from 'ubc-farm-money';
import { priceIntSelector } from './selectors-row.js';

export * from './selectors-row.js';

export const sortInfo = state => state.sortInfo;
export const sortMapSelector = createSelector(
	sortInfo,
	sort => sort.map
);

export const selected = state => state.selected;
export const selectedLength = createSelector(
	selected,
	set => set.size
);

const invoice = formValueSelector('invoice');

export const rowsSelector = state => invoice(state, 'rows');
export const rowsLength = createSelector(
	rowsSelector,
	rows => (rows ? rows.length : 0)
);

export const allSelected = createSelector(
	selectedLength,
	rowsLength,
	(selectedCount, rowCount) => selectedCount === rowCount
);

export const subtotalIntSelector = createSelector(
	rowsSelector,
	(rows) => {
		let subtotalInt = 0;
		if (!rows) return subtotalInt;

		for (let i = 0; i < rows.length; i++) {
			// const rowSelector = invoice(state, `rows[${i}]`);
			const priceInt = priceIntSelector(rows[i]);

			if (!Number.isNaN(priceInt)) subtotalInt += priceInt;
		}
		return subtotalInt;
	}
);

export const vatSelector = () => 0.04; // invoice('vat');

export const totalIntSelector = createSelector(
	subtotalIntSelector,
	vatSelector,
	(subtotalInt, VAT) => subtotalInt * (VAT + 1)
);

export const amountPaidIntSelector = createSelector(
	state => invoice(state, 'amountPaid'),
	amount => new Money(amount).toInteger()
);


export const balanceDueIntSelector = createSelector(
	totalIntSelector,
	amountPaidIntSelector,
	(totalInt, amountPaidInt) => totalInt - amountPaidInt
);

export const datalistID = state => state.itemlist.list;
export const datalistValues = state => state.itemlist.data;
