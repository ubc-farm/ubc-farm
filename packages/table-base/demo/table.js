import { createElement as h, PropTypes, PureComponent } from 'react';
/** @jsx h */
import { Body, Head, Column } from '../index.js';

/**
 * @param {Map<K, WeakMap<Column, *>>} data - data to sort.
 * @param {Column} sortColumn - column to use for sorting.
 * @param {boolean} [descending] - if false, sorting is reversed.
 * @returns {Array<K>} An array where the order of the entries is the
 * order used in the table, and the values correspond to row keys in
 * the data map.
 */
export function generateSortMap(data, sortColumn, descending = true) {
	const columnData = Array.from(data,
		([rowKey, rowData]) => [rowKey, sortColumn.getValue(rowData)]
	);

	const multiplier = descending ? 1 : -1;

	const sortedData = columnData.sort(([, a], [, b]) => (
		sortColumn.compareFunc(a, b) * multiplier
	));

	const sortMap = sortedData.map(([rowKey]) => rowKey);
	return sortMap;
}

/**
 * Example table that uses the table-controls components.
 */
export default class Table extends PureComponent {
	static get propTypes() {
		return {
			data: PropTypes.instanceOf(Map),
			columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)),
			className: PropTypes.string,
			sorting: PropTypes.bool,
			selection: PropTypes.bool,
		};
	}

	constructor(props) {
		super(props);

		const { sorting, selection } = props;
		const state = {};
		if (selection) state.selected = new Set();
		if (sorting) state.sort = { column: undefined, descending: true };
		this.state = state;

		this.onRowSelect = selection ? this.onRowSelect.bind(this) : undefined;
		this.onColumnCheckboxChange = selection ?
			this.onColumnCheckboxChange.bind(this) : undefined;
		this.onColumnClick = sorting ? this.onColumnClick.bind(this) : undefined;
	}

	onRowSelect(rowKey) {
		const selected = new Set(this.state.selected);
		if (!selected.has(rowKey)) selected.add(rowKey);
		else selected.delete(rowKey);
		this.setState({ selected });
	}
	onColumnCheckboxChange() {
		const { data } = this.props;
		const { selected } = this.state;
		if (selected.size === data.size) this.setState({ selected: new Set() });
		else this.setState({ selected: new Set(data.keys()) });
	}
	onColumnClick(column) {
		const { column: sortColumn, descending } = this.state.sort;
		if (sortColumn === column) {
			this.setState({ sort: { column, descending: !descending } });
		} else {
			this.setState({ sort: { column, descending: true } });
		}
	}

	generateSortMap() {
		const { sort } = this.state;
		if (!sort) return undefined;

		const { column: sortColumn, descending } = sort;
		if (!sortColumn) return undefined;

		const { data } = this.props;
		return generateSortMap(data, sortColumn, descending);
	}

	render() {
		const { data, columns, className } = this.props;
		const { selected, sort } = this.state;

		return (
			<table className={className}>
				<caption style={{ visibility: selected.size > 0 ? 'visible':'hidden' }}>
					{`${selected.size} item${selected.size > 1 ? 's' : ''} selected`}
				</caption>
				<Head
					columns={columns}
					selectedLength={selected ? selected.size : undefined}
					dataLength={data.size}
					sorting={sort}
					onCheckboxChange={this.onColumnCheckboxChange}
					onColumnClick={this.onColumnClick}
				/>
				<Body
					{...{ data, columns, selected }}
					sortMap={this.generateSortMap()}
					onSelect={this.onRowSelect}
				/>
			</table>
		);
	}
}
