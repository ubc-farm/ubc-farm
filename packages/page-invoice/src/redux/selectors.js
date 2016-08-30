import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { Money } from 'ubc-farm-utils';

const invoice = formValueSelector('invoice');

export const selected = state => state.selected;
export const selectedLength = createSelector(
	selected,
	set => set.size
);

export const rowsSelector = invoice('rows');
export const rowsLength = createSelector(
	rowsSelector,
	rows => rows.length
);

export const subtotalSelector = createSelector(
	rowsSelector,
	rows => Money.fromInteger(
		rows.reduce((totalInt = 0, { unitCost, quantity }) => {
			const unitCostInt = new Money(unitCost).toInteger();
			const rowPrice = quantity * unitCostInt;

			if (Number.isNaN(rowPrice)) return totalInt;
			return totalInt + rowPrice;
		})
	)
);

const VAT = 0.04;
export const totalSelector = createSelector(
	subtotalSelector,
	subtotal => {
		const subtotalInt = subtotal.toInteger();
		const totalInt = subtotalInt * (VAT + 1);

		return Money.fromInteger(totalInt);
	}
);
