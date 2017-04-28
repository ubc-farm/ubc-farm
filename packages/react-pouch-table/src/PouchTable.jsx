// @ts-check
import { createElement, Component } from 'react'; /** @jsx createElement */
import { InfiniteLoader, Table } from 'react-virtualized';

const clickNames = ['onRowClick', 'onRowDoubleClick', 'onRowMouseOut', 'onRowMouseOver'];
const getNames = ['rowClassName', 'rowHeight', 'rowStyle'];

export default class PouchTable extends Component {
	constructor(props) {
		super(props);
		this.state = { ready: false };

		this.isRowLoaded = this.isRowLoaded.bind(this);
		this.loadMoreRows = this.loadMoreRows.bind(this);

		this.setDatabase(props.db);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.db !== this.db) {
			this.setState({ ready: false });
			this.setDatabase(nextProps.db);
		}
	}

	async setDatabase(db) {
		this.db = db;

		const { startkey, endkey, keys } = this.props;
		const res = await this.db.allDocs(keys
			? { keys }
			: { startkey, endkey });
		this.rows = res.rows;

		this.setState({ ready: true });
	}

	isRowLoaded({ index }) {
		const row = this.rows[index];
		return row.doc || row.loading;
	}

	wrapClick(funcName) {
		const clickFunc = this.props[funcName];
		if (typeof clickFunc !== 'function') return undefined;

		return ({ index }) => {
			const { id } = this.rows[index];
			return clickFunc({ id, index });
		};
	}

	wrapGetter(funcName) {
		const getterFunc = this.props[funcName];
		if (typeof getterFunc !== 'function') return getterFunc;

		return ({ index }) => {
			const { id } = this.rows[index];
			return getterFunc({ id, index });
		};
	}

	wrappers() {
		const _wrappers = {};
		clickNames.forEach((name) => { _wrappers[name] = this.wrapClick(name); });
		getNames.forEach((name) => { _wrappers[name] = this.wrapGetter(name); });
		return _wrappers;
	}

	async loadMoreRows({ startIndex, stopIndex }) {
		const focus = this.rows.slice(startIndex, stopIndex);
		const toLoad = focus.filter(row => !row.doc && !row.loading)
			.reduce((map, row) => {
				row.loading = true;
				return map.set(row.id, row);
			}, new Map());

		const { rows } = await this.db.allDocs({
			include_docs: true,
			keys: Array.from(toLoad.keys()),
		});

		for (const { doc, id } of rows) {
			const value = toLoad.get(id);
			value.loading = false;
			if (doc) value.doc = doc;
		}
	}

	render() {
		if (!this.state.ready) return null;
		const tableProps = Object.assign({}, this.props);
		delete tableProps.db;

		return (
			<InfiniteLoader
				isRowLoaded={this.isRowLoaded}
				loadMoreRows={this.loadMoreRows}
				rowCount={this.rows.length}
			>
				{({ onRowsRendered, registerChild }) => (
					<Table
						onRowsRendered={onRowsRendered}
						ref={registerChild}
						rowCount={this.rows.length}
						rowGetter={({ index }) => this.rows[index].doc || {}}
						{...tableProps}
						{...this.wrappers()}
					>
						{tableProps.children}
					</Table>
				)}
			</InfiniteLoader>
		);
	}
}
