import { createElement, PropTypes, PureComponent } from 'react';
import { bindAll } from 'lodash-es';
import { sort } from '../manipulate/index.js';
import { getColumnInfo } from '../present/HeadColumn.jsx';
import TableBase from '../present/Table.jsx';
import Head from './Head.jsx';
import Body from '../present/Body.jsx';
import Insert from './Insert.jsx';
import Toolbar from '../present/Toolbar.jsx';
/** @jsx createElement */

export default class Table extends PureComponent {
	constructor(props) {
		super(props);

		bindAll(this, 'handleSelect', 'handleSelectAll', 'handleSortChange');
		this.state = {
			sortName: props.sortName || null,
			sortOrder: props.sortOrder || null,
			selected: new Set(),
			inserting: false,
		};
	}

	/**
	 * Overrides state with related props when updated externally
	 * Currently looks at sortName and sortOrder.
	 */
	componentWillReceiveProps(nextProps) {
		const { sortName, sortOrder } = nextProps;
		const newState = {};
		if (sortName) newState.sortName = sortName;
		if (sortOrder) newState.sortOrder = sortOrder; // TODO improve...
		this.setState(newState);
	}

	/** @returns {Object[]} filtered version of tableData */
	getDisplayedData() {
		let data = this.props.tableData;

		if (this.state.sortName) {
			const { sortName, sortOrder } = this.state;
			data = sort(
				data,
				sortOrder, sortName,
				getColumnInfo(this.props.children).get(sortName).sortFunc
			);
		}

		return data;
	}

	/** @returns {string} row keyField, calcualted from column info */
	getKeyField() {
		const { keyField, children } = this.props;
		if (keyField) return keyField;

		if (!Array.isArray(children)) return children.props.dataField;
		for (const { props: { isKey, dataField } } of children) {
			if (isKey) return dataField;
		}

		throw new TypeError('No keyField found, must be specified in props or children');
	}

	getSelectSize() {
		const { remote, selectRow: { selected, unselectable } } = this.props;
		if (remote) return selected.size - (unselectable ? unselectable.size : 0);
		else return this.state.selected.size - (unselectable ? unselectable.size : 0);
	}

	/** @returns {Object} equivalent to props.selectRow */
	getSelectData() {
		const { selectRow } = this.props;
		if (!selectRow) return null;

		return Object.assign({}, selectRow, {
			selected: this.props.remote
				? selectRow.selected
				: this.state.selected,
			onSelect: this.handleSelect,
			onSelectAll: this.handleSelectAll,
		});
	}

	/**
	 * Callback for when a row is selected.
	 * If a handler is specified in the props, it will be called with the rowData,
	 * current selection state, and the change event. If false is returned, then
	 * the selection will not change.
	 * If the remote prop is true, no changes will be made and selection is
	 * handled externally. Otherwise, the selection will be toggled.
	 * If the selection mode is set to radio, the clicked row
	 * will be the only selected one.
	 *
	 * @param {Object} rowData
	 * @param {boolean} isSelected
	 * @param {React.SyntheticEvent} event
	 */
	handleSelect(rowData, isSelected, event) {
		const id = rowData[this.getKeyField()];
		const { selectRow } = this.props;

		if (typeof selectRow.onSelect === 'function') {
			// If the passed in function returns false, don't change selection
			if (!selectRow.onSelect(rowData, isSelected, event)) return;
		}

		if (this.props.remote) return;

		if (selectRow.mode === 'radio') {
			const selected = new Set();
			if (!this.state.selected.has(id)) selected.add(id);
			this.setState({ selected });
			return;
		}

		if (isSelected) {
			const copy = new Set(this.state.selected);
			copy.delete(id);
			this.setState({ selected: copy });
		} else {
			const { unselectable } = selectRow;
			if (unselectable && unselectable.has(id)) return;

			this.setState({ selected: new Set(this.state.selected).add(id) });
		}
	}

	/**
	 * Handler for the checkbox in the table header.
	 * If a onSelectAll function was specified in props, it will be
	 * called. If false is returned, no changes are made.
	 * If an array of row IDs is returned, it becomes the new list of
	 * selected rows.
	 * If the remote prop is set to true, no futher action is done.
	 * Otherwise: If all the rows are currently selected,
	 * the selection is changed so none are selected.
	 * If none/a few are selected, all the _visible_ rows are selected.
	 * Unselectable rows are skipped.
	 */
	handleSelectAll() {
		const { selectRow, tableData } = this.props;
		const isAllSelected = tableData.length === this.getSelectSize();

		if (typeof selectRow.onSelectAll === 'function') {
			const result = selectRow.onSelectAll(isAllSelected, this.props.tableData);
			if (Array.isArray(result)) {
				this.setState({ selected: new Set(result) });
				return;
			} else if (!result) {
				return;
			}
		}

		if (this.props.remote) return;

		if (isAllSelected) {
			this.setState({ selected: new Set() });
		} else {
			const { unselectable } = selectRow;
			const toSelect = new Set();
			const keyField = this.getKeyField();
			for (const { [keyField]: id } of this.getDisplayedData()) {
				if (!unselectable || !unselectable.has(id)) toSelect.add(id);
			}
			this.setState({ selected: toSelect });
		}
	}

	/**
	 * Called when a header cell is clicked. Changes the table sorting
	 * based on what is clicked. The onSortChange prop is called
	 * with the clicked column name and current sort order if present.
	 * @param {string} columnName
	 */
	handleSortChange(columnName) {
		const { sortName, sortOrder } = this.state;
		const { onSortChange } = this.props;

		if (typeof onSortChange === 'function') {
			onSortChange(columnName, sortOrder);
		}

		if (this.props.remote) return;

		if (sortName === columnName) {
			let newOrder;
			switch (sortOrder) {
				case 'desc':
					newOrder = 'asc';
					break;
				case 'asc':
				default:
					newOrder = 'desc';
					break;
			}
			this.setState({ sortOrder: newOrder });
		} else {
			const column = getColumnInfo(this.props.children).get(columnName);
			if (column && column.sort) {
				this.setState({
					sortName: columnName,
					sortOrder: this.props.defaultSortOrder || 'desc',
				});
			}
		}
	}

	/** @returns {ReactElement} toolbar above table w/ buttons and search */
	renderToolbar() {
		return (
			<Toolbar
				insert={this.props.handleAdd ? {
					onClick: () => this.setState({ inserting: !this.state.inserting }),
				} : null}
			>
				{ this.props.handleAdd ?
					<Insert
						columnInfo={getColumnInfo(this.props.children)}
						open={this.state.inserting}
						onSubmit={this.props.handleAdd} // TODO autoKey
					/>
				: null}
			</Toolbar>
		);
	}

	/** @returns {ReactElement} filtering controls */
	renderFilters() {
		return null; // TODO stub
	}

	/** @returns {ReactElement} pagination controls */
	renderPaginationControls() {
		return null; // TODO stub
	}

	render() {
		const { props, props: { children } } = this;

		const tableData = this.getDisplayedData();
		const selectRow = this.getSelectData();

		return (
			<TableBase
				{...this.props}
				toolbar={this.renderToolbar()}
				footer={this.renderFilters()}
				pagination={this.renderPaginationControls()}
			>
				<Head
					headClassName={props.headClassName}
					headRowClassName={props.headRowClassName}
					sortName={this.state.sortName || props.defaultSortName}
					sortOrder={this.state.sortOrder || props.defaultSortOrder}
					onSortChange={this.handleSortChange}
					isAllSelected={selectRow && tableData.length === this.getSelectSize()}
					indeterminate={selectRow && selectRow.selected.size > 0}
					columns={children}
					selectRow={selectRow}
				/>
				<Body
					keyField={this.getKeyField()}
					noDataText={props.noDataText}
					trClassName={props.trClassName}
					bodyClassName={props.bodyClassName}
					selectRow={selectRow}
					cellEdit={props.cellEdit}
					tableData={tableData}
					columnInfo={getColumnInfo(children)}
					onRowMouseEnter={props.onRowMouseEnter}
					onRowMouseOut={props.onRowMouseOut}
				/>
			</TableBase>
		);
	}
}

Table.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
	keyField: PropTypes.string,
	remote: PropTypes.bool,

	selectRow: PropTypes.shape({
		selected: PropTypes.instanceOf(Set),
		unselectable: PropTypes.instanceOf(Set),
		onSelect: PropTypes.func,
		onSelectAll: PropTypes.func,
	}),

	cellEdit: PropTypes.shape({
		mode: PropTypes.oneOf(['click', 'dbclick']).isRequired,
		blurToSave: PropTypes.bool,
		beforeCellSave: PropTypes.func, // (row, cellName, cellValue) => boolean
		afterCellSave: PropTypes.func, // (row, cellName, cellValue) => void
	}),

	sortName: PropTypes.string,
	sortOrder: PropTypes.oneOf(['desc', 'asc']),
	defaultSortName: PropTypes.string,
	defaultSortOrder: PropTypes.oneOf(['desc', 'asc']),
	onSortChange: PropTypes.func,

	handleAdd: PropTypes.func,
};
