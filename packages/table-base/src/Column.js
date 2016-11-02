import { PropTypes, Children } from 'react';

const Column = () => null;

Column.propTypes = {
	dataField: PropTypes.string.isRequired,
	isKey: PropTypes.bool,
	dataSort: PropTypes.bool,
	dataFormat: PropTypes.func, // (cell, row, extraFormatData) => ReactNode
	extraFormatData: PropTypes.any, // eslint-disable-line react/forbid-prop-types
	filterFormatted: PropTypes.bool,
	filterValue: PropTypes.func, // (cell, row) => any
	csvFormat: PropTypes.func, // (cell, row) => string
	csvHeader: PropTypes.string,
	hidden: PropTypes.bool,
	export: PropTypes.bool,
	hiddenInInsert: PropTypes.bool,
	searchable: PropTypes.bool,
	columnTitle: PropTypes.bool,
	sortFunc: PropTypes.func, // (a, b, order. sortField, extraSortData) => number
	extraSortData: PropTypes.any, // eslint-disable-line react/forbid-prop-types
	// (cell, row, rowIndex, columnIndex) => string
	headerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	// (cell, row, rowIndex, columnIndex) => string
	columnClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	editable: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
		type: PropTypes.string,
		validator: PropTypes.func, // (cellValue) => boolean
		options: PropTypes.arrayOf(PropTypes.string),
	})]),
	customEditor: PropTypes.element,
	autoKey: PropTypes.bool,
	filter: PropTypes.shape({
		type: PropTypes.oneOf([
			'TextFilter',
			'SelectFilter',
			'NumberFilter',
			'DataFilter',
			'RegexFilter',
		]).isRequired,
		defaultValue: PropTypes.any.isRequired,
		delay: PropTypes.number,
		placeholder: PropTypes.string,
		numberComparators: PropTypes.arrayOf(PropTypes.string),
		options: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.number)]),
	}),
};

Column.defaultProps = {
	searchable: true,
};

export default Column;

/**
 * Converts the column ReactElements into objects with data for cells to look at.
 * @param {Column[]} columnElements
 * @returns {Map<string, Object>} columnInfo where the keys are the object key
 * that the column represents, and the object describes data about the column.
 */
export function getColumnInfo(columnElements) {
	return new Map(Children.map(columnElements, ({ props }, index) => [
		props.dataField,
		{
			sort: props.dataSort, // True to enable sorting
			format: props.dataFormat || (cell => cell), // Function to customize the column
			// Use formatted data for search/filtering
		//	filterFormatted: props.filterFormatted,
			// Enable editing. If object, more settings avaliable
			editable: props.editable,
		//	customEditor: props.customEditor, // Custom editing component
			hidden: props.hidden, // Hide the column
			// Don't show the column as a field in the insert dialog
			hiddenOnInsert: props.hiddenOnInsert,
		//	searchable: props.searchable, // False to disable searching the column
			className: props.columnClassName, // The className for cells in the column
			text: props.children, // Text name of the column
			sortFunc: props.sortFunc, // Custom sorting function
			export: props.export, // True to export column. Default is !hidden
			index, // order of the column
		},
	]));
}
