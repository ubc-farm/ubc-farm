import { PropTypes } from 'react';

Table.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	keyField: PropTypes.string,
	remote: PropTypes.bool,

	pagination: PropTypes.bool,
	ignoreSinglePage: PropTypes.bool,
	// (rowData, rowIndex) => string
	trClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

	insertRow: PropTypes.bool,
	deleteRow: PropTypes.bool,
	columnFilter: PropTypes.bool,

	search: PropTypes.bool,
	searchPlaceholder: PropTypes.string,
	multiColumnSearch: PropTypes.bool,

	exportCSV: PropTypes.bool,
	csvFileName: PropTypes.string,

	selectRow: PropTypes.shape({
		mode: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
		clickToSelect: PropTypes.bool,
		clickToSelectAndEditCell: PropTypes.bool,
		className: PropTypes.string,
		selected: PropTypes.arrayOf(PropTypes.string),
		unselectable: PropTypes.arrayOf(PropTypes.string),
		hideSelectColumn: PropTypes.bool,
		showOnlySelected: PropTypes.bool,
		onSelect: PropTypes.func, // (row, isSelected, event) => boolean
		onSelectAll: PropTypes.func, // (isAllSelected, rows) => boolean|string[]
	}),
	cellEdit: PropTypes.shape({
		mode: PropTypes.oneOf(['click', 'dbclick']).isRequired,
		blurToSave: PropTypes.bool,
		beforeCellSave: PropTypes.func, // (row, cellName, cellValue) => boolean
		afterCellSave: PropTypes.func, // (row, cellName, cellValue) => void
	}),

	sortName: PropTypes.string,
	sortOrder: PropTypes.oneOf(['asc', 'desc']),
	defaultSortName: PropTypes.string,
	defaultSortOrder: PropTypes.oneOf(['asc', 'desc']),

	noDataText: PropTypes.node,
	searchDelayTime: PropTypes.number,
	ignoreEditable: PropTypes.bool,

	afterTableComplete: PropTypes.func, // () => void
	afterDeleteRow: PropTypes.func, // (rowKeys) => void
	afterInsertRow: PropTypes.func, // (row) => void

	prePageText: PropTypes.string,
	nextPageText: PropTypes.string,
	firstPageText: PropTypes.string,
	lastPageText: PropTypes.string,
	page: PropTypes.number,
	pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
	pageSize: PropTypes.number,
	hideSizeOptions: PropTypes.bool,
	onPageChange: PropTypes.func, // (page, pageSize) => void
	onPageSizeChange: PropTypes.func, // (pageSize) => void

	insertText: PropTypes.node,
	deleteText: PropTypes.node,
	saveText: PropTypes.node,
	closeText: PropTypes.node,
	exportCSVText: PropTypes.node,

	onSortChange: PropTypes.func, // (sortName, sortOrder) => void
	searchString: PropTypes.string,
	onSearchChange: PropTypes.func, // (searchText, colInfos, multiColumnSearch) => void
	afterSearch: PropTypes.func, // (searchText, results) => void
	afterColumnFilter: PropTypes.func, // (filterConds, result) => void

	onAddRow: PropTypes.func, // (row) => void
	onFilterChange: PropTypes.func, // (filterObj) => void
	onExportToCSV: PropTypes.func, // () => Object[]
	onDeleteRow: PropTypes.func, // (row) => void
	onRowClick: PropTypes.func, // (row) => void

	onMouseEnter: PropTypes.func, // () => void
	onMouseLeave: PropTypes.func, // () => void
	onRowMouseEnter: PropTypes.func, // (row) => void
	onRowMouseOut: PropTypes.func, // (row) => void
	confirmDeleteRow: PropTypes.func, // (rowKeys) => Promise<boolean>
};

Table.defaultProps = {
	searchPlaceholder: 'Search',
	csvFileName: 'spreadsheet.csv',
	noDataText: '',
	searchDelayTime: 500,
	prePageText: '<',
	nextPageText: '>',
	firstPageText: '<<',
	lastPageText: '>>',
	page: 1,
	pageSizeOptions: [10, 25, 30, 50],
	insertText: 'Insert',
	deleteText: 'Delete',
	saveText: 'Save',
	closeText: 'Close',
	exportCSVText: 'Export CSV',
};
