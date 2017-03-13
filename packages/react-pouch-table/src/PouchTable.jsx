import { createElement, Component } from 'react'; /** @jsx createElement */
import { InfiniteLoader, Table } from 'react-virtualized';

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
					>
						{tableProps.children}
					</Table>
				)}
			</InfiniteLoader>
		);
	}
}
