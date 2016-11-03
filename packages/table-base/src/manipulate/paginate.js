export function getTotalPageCount(tableData, pageSize) {
	return Math.ceil(tableData / pageSize);
}

/**
 * Gets a certain 'page' of the table data, based on the provided page size
 * and number.
 * @param {Array} tableData
 * @param {number} pageSize - corresponds to how many items you want returned
 * @param {number} [pageNumber=1] - current page to return. Starts at 1.
 */
export default function paginate(
	tableData,
	pageSize,
	pageNumber = 1,
) {
	const pageIndex = pageNumber - 1;
	const start = pageIndex * pageSize;

	return tableData.slice(start, start + pageSize + 1);
}
