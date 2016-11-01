import 'es7-object-polyfill';

export default function search(
	tableData,
	columnInfo,
	searchTerm,
	{ multiColumnSearch } = {}
) {
	if (searchTerm.trim() === '') return tableData;

	const searchList = multiColumnSearch ? searchTerm.split(' ') : [searchTerm];
	return tableData.filter((row, index) => {
		for (let [key, value] of Object.entries(row)) {
			const isZero = parseInt(value, 10) === 0; // because zero is falsy
			if (columnInfo.has(key) && (value || isZero)) {
				const info = columnInfo.get(key);
				if (info.searchable) {
					const { format, filterFormatted, filterValue } = info;
					if (filterFormatted && format) value = format(value, row, index);
					else if (filterValue) value = filterValue(value, row);

					for (let searchText of searchList) {
						searchText = searchText.toLowerCase();
						if (value.toString().toLowerCase().includes(searchText)) {
							return true;
						}
					}
				}
			}
		}
		return false;
	});
}
