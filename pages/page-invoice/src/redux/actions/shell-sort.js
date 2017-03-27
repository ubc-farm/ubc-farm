import { defaultMemoize } from 'reselect';
import { formValueSelector, arraySwap, blur, focus } from 'redux-form';
import Money from 'ubc-farm-money';
import { sortInfo, rowsLength } from '../selectors.js';

function compareString(a, b) {
	return String(a).localeCompare(b);
}
function compareNumber(a, b) { return b - a; }
function compareMoney(a, b) {
	const aNum = new Money(a).toInteger();
	const bNum = new Money(b).toInteger();
	return compareNumber(aNum, bNum);
}

const compare = defaultMemoize(column => {
	switch (column) {
		case 'unitCost':
			return compareMoney;
		case 'price': case 'quantity':
			return compareNumber;
		default:
			return compareString;
	}
});

const invoice = formValueSelector('invoice');

export function shellSortRows(swapAction) {
	return (dispatch, getState) => {
		const column = sortInfo(getState()).key;
		const reverse = sortInfo(getState()).dir === 'up';
		const length = rowsLength(getState());
		let h = 1;
		while (h < length / 3) h = (3 * h) + 1;

		while (h > 0) {
			for (let i = h; i < length; i++) {
				for (let j = i; j > 0; j -= h) {
					const a = invoice(getState(), `rows[${j}].${column}`);
					const b = invoice(getState(), `rows[${j - h}].${column}`);

					let comparison = compare(column)(a, b);
					if (reverse) comparison *= -1;
					if (comparison < 0) dispatch(swapAction(j, j - h));
				}
			}

			h = --h / 3;
		}
	};
}

export function sortRows() {
	return shellSortRows((a, b) => arraySwap('invoice', 'rows', a, b));
}
