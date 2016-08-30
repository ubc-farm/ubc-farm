import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import Money from 'ubc-farm-money';
import { priceIntSelector } from './selectors-row.js';

export * from './selectors-row.js';

const invoice = formValueSelector('invoice');

export const selected = state => state.selected;
export const selectedLength = createSelector(
	selected,
	set => set.size
);

export const sortInfo = state => state.sortInfo;
export const sortMapSelector = createSelector(
	sortInfo,
	sort => sort.map
);

export const rowsSelector = invoice('rows');
export const rowsLength = createSelector(
	rowsSelector,
	rows => rows.length
);

export const subtotalIntSelector = createSelector(
	rowsSelector,
	(rows) => {
		let subtotalInt = 0;
		for (let i = 0; i < rows.length; i++) {
			const rowSelector = invoice(`rows[${i}]`);
			const priceInt = priceIntSelector(rowSelector(rows[i]));

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
	invoice('amountPaid'),
	amount => new Money(amount).toInteger()
);


export const balanceDueIntSelector = createSelector(
	totalIntSelector,
	amountPaidIntSelector,
	(totalInt, amountPaidInt) => totalInt - amountPaidInt
);
