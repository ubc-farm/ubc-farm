import { PropTypes } from 'react';

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
