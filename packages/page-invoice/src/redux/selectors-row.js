import { createSelector } from 'reselect';
import Money from 'ubc-farm-money';

export const unitCostIntSelector = createSelector(
	rowState => rowState.unitCost,
	unitCost => new Money(unitCost).toInteger()
);

export const quantitySelector = rowState => rowState.quantity;

export const priceIntSelector = createSelector(
	unitCostIntSelector,
	quantitySelector,
	(unitCostInt, quantity) => unitCostInt * quantity
);
