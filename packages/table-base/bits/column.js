import {createElement} from 'react';
import {format} from 'ubc-farm-utils/index.js'
import Cell from './cell.js';

/**
 * Used to define attributes of a table column
 */
export default class Column {
	/**
	 * @param {Object} props
	 * @param {string} props.columnKey - ID for the column, should be unique
	 * @param {string} [props.title] - title used in header cell. By default, it
	 * is created from formatting the columnKey.
	 * @param {string} [props.description] - shown when hovering on header cell
	 * @param {string} [props.align=left] - text alignment for the column cells.
	 * @param {function} [props.compareFunc] - used for sorting. 
	 * Omitting means sorting is disabled for the column.
	 * @param {function} props.toElement - used to turn the data into a react
	 * @param {function} props.getValue - Used to transform data into a value 
	 * for the cell and for sorting
	 */
	constructor(props) {
		if (typeof props === 'string') props = {columnKey: props};

		const {title = format(props.columnKey), align = 'left'} = props;
		const {toElement = this.super_toElement} = props;
		const {getValue = this.super_getValue} = props;
		
		let {compareFunc} = props;
		if (compareFunc && typeof compareFunc !== 'function') //if truthy
			compareFunc = this.super_compareFunc;

		Object.assign(this, props, {
			title, align, 
			toElement: toElement.bind(this), 
			compareFunc: compareFunc.bind(this), 
			getValue: getValue.bind(this),
			useSorting: props.compareFunc? true : false
		});
		Object.freeze(this);
	}

	/** @returns {Object} the column object as a plain object */
	toJSON() {
		return Object.assign({}, this, {key: this.key})
	}

	/** @returns {string} columnKey */
	toString() {return this.columnKey;}
	get key()  {return this.columnKey;}

	/** 
	 * Retrives the value for the given row and column. 
	 * Used as default getValue function, but can also be used by overriding
	 * functions.
	 * @param {WeakMap<Column, V>} rowData
	 * @param {Column} column - thisArg
	 * @returns {V} value 
	 */
	super_getValue(rowData, column = this) {
		return rowData.get(column);
	}

	/**
	 * Transforms the value from getValue into an React element
	 * @param {V} value from getValue
	 * @param {string} rowKey - key for the row in data
	 * @param {Object} [props] to use, normally computed from the column
	 * @returns {ReactElement} the cell used for the table
	 */
	super_toElement(value, rowKey, props = this.toJSON()) {
		return createElement(Cell, props, value);
	}

	/**
	 * Compares two items from getValue and returns a number
	 * indicating their order compared to each other.
	 * @param {V} a
	 * @param {V} b
	 * @returns {number}
	 */
	super_compareFunc(a, b) {
		if (typeof a === 'string' || typeof b === 'string')
			return String(a).localeCompare(b);
		else if (typeof a === 'number' || typeof b === 'number') 
			return b - a;
		else return 0; 
	}
}