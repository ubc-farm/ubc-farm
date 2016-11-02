import { createElement, PropTypes, Children } from 'react';
import { classlist as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/** Presentational component for a th inside the thead */
const HeadColumn = props => (
	<th
		scope="col"
		{...props}
		className={cx('farmtable-HeadColumn', props.className)}
	/>
);

HeadColumn.propTypes = { className: PropTypes.string };

export default HeadColumn;


/**
 * Converts the column ReactElements into objects with data for cells to look at.
 * @param {Column[]} columnElements
 * @returns {Map<string, Object>} columnInfo where the keys are the object key
 * that the column represents, and the object describes data about the column.
 */
export function getColumnInfo(columnElements) {
	return new Map(columnElements.map(({ props }, index) => [
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
