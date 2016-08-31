import { register } from 'promise-worker';
import Money from 'ubc-farm-money';

function compare([, a], [, b]) {
	if (typeof a === 'string' || typeof b === 'string') {
		return String(a).localeCompare(b);
	}	else if (typeof a === 'number' || typeof b === 'number') {
		return b - a;
	}

	return 0;
}

/**
 * @param {Object[]} data to sort.
 * @param {string} sortKey - column key name to use for sorting.
 * @param {boolean} [reverse] - if true, sorting is reversed.
 * @returns {Array<number>} An array where the order of the entries is the
 * order used in the table, and the values correspond to row keys in
 * the data map.
 */
function buildSortMap(data, sortKey, reverse) {
	let columnData = data.map((rowData, index) => [index, rowData[sortKey]]);

	if (sortKey === 'unitCost') {
		columnData = columnData.map(
			([index, value]) => [index, new Money(value).toInteger()]
		);
	}

	const sortMap = columnData.sort(compare).map(([rowIndex]) => rowIndex);

	if (reverse) sortMap.reverse();
	return sortMap;
}

register(({ data, key, dir }) => buildSortMap(data, key, dir === 'up'));
