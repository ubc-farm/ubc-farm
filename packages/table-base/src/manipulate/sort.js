function defaultSort(a, b, sortOrder, sortField) {
	let valueA = a[sortField] == null ? '' : a[sortField];
	let valueB = b[sortField] == null ? '' : b[sortField];

	if (sortOrder === 'desc') [valueA, valueB] = [valueB, valueA];

	if (typeof valueB === 'string') return valueB.localeCompare(valueA);
	else if (valueA > valueB) return -1;
	else if (valueA < valueB) return 1;
	else return 0;
}

/**
 * Function used to sort table data.
 * @param {Object[]} tableData
 * @param {string} sortOrder - either 'desc' or 'asc'
 */
export default function sort(
	tableData,
	sortOrder,
	sortName,
	sortFunc = defaultSort,
) {
	if (sortOrder !== 'desc' && sortOrder !== 'asc') {
		throw new TypeError(`sortOrder must be desc/asc, gave ${sortOrder}`);
	}

	return [...tableData].sort((a, b) => sortFunc(a, b, sortOrder, sortName));
}
