import { defaultMemoize } from 'reselect';
import { arraySwap } from 'redux-form';
import Money from 'ubc-farm-money';
import { sortInfo, rowsSelector, rowsLength } from '../selectors.js';

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

export function sortRows() {
	return (dispatch, getState) => {
		const column = sortInfo(getState()).key;
		const reverse = sortInfo(getState()).dir === 'up';
		const length = rowsLength(getState());
		let h = 1;
		while (h < length / 3) h = (3 * h) + 1;

		while (h > 0) {
			for (let i = h; i < length; i++) {
				for (let j = i; j > 0; j -= h) {
					const a = rowsSelector(getState())[j][column];
					const b = rowsSelector(getState())[j - h][column];

					let comparison = compare(column)(a, b);
					if (reverse) comparison *= -1;
					if (comparison < 0) dispatch(arraySwap('invoice', 'rows', j, j - h));
				}
			}

			h = --h / 3;
		}
	};
}

const getColumnName = defaultMemoize(text => {
	const index = text.lastIndexOf('.');
	return index === -1 ? text : text.substr(index + 1);
});

export function reSortOnChange(inputName) {
	return (dispatch, getState) => {
		if (sortInfo(getState()) === getColumnName(inputName)) {
			dispatch(sortRows());
		}
	};
}
