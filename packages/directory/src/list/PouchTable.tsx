import { createElement, Component } from 'react'; /** @jsx createElement */
import { InfiniteLoader, Table } from 'react-virtualized';
export { Column } from 'react-virtualized';

export type HeaderRowRendererParams = {
    className: string,
    columns: React.ReactNode[],
    style: React.CSSProperties,
    scrollbarWidth: number,
    height: number,
    width: number
};
export type RowRendererParams = {
    className: string,
    columns: Array<any>,
    index: number,
    isScrolling: boolean,
    onRowClick?: Function,
    onRowDoubleClick?: Function,
    onRowMouseOver?: Function,
    onRowMouseOut?: Function,
    rowData: any,
    style: any
};
export type IndexParam = { index: number };
export type TableRowRenderer = (params: RowRendererParams) => React.ReactNode;
export type TableHeaderRowRenderer = (params: HeaderRowRendererParams) => React.ReactNode;
export type SortDirectionType = 'ASC' | 'DESC';

export interface PouchTableProps {
	db: PouchDB.Database<any>;
	startkey?: string;
	endkey?: string;
	keys?: string[];

	autoHeight?: boolean;
  children?: React.ReactChildren;
  className?: string;
  disableHeader?: boolean;
  estimatedRowSize?: number;
  gridClassName?: string;
  gridStyle?: any;
  headerClassName?: string;
  headerHeight: number;
  headerStyle?: any;
  height: number;
  id?: string;
  noRowsRender?: () => void;
  onHeaderClick?: (dataKey: string, columnData: any) => void;
  onRowClick?: (info: IndexParam) => void;
  onRowDoubleClick?: (info: IndexParam) => void;
  onRowMouseOut?: (info: IndexParam) => void;
  onRowMouseOver?: (info: IndexParam) => void;
  overscanRowCount?: number;
  onScroll?: (info: { clientHeight: number, scrollHeight: number, scrollTop: number }) => void;
  rowClassName?: string | ((info: IndexParam) => string);
  rowHeight: number | ((info: IndexParam) => number);
  rowRenderer?: TableRowRenderer;
  headerRowRenderer?: TableHeaderRowRenderer;
  rowStyle?: React.CSSProperties | ((info: IndexParam) => React.CSSProperties);
  scrollToAlignment?: string;
  scrollToIndex?: number;
  scrollTop?: number;
  sort?: (info: { sortBy: string, sortDirection: SortDirectionType }) => void;
  sortBy?: string;
  sortDirection?: SortDirectionType;
  style?: React.CSSProperties;
  tabIndex?: number;
  width: number;
}

interface PouchTableState {
	ready: boolean;
}

export default class PouchTable<T> extends Component<PouchTableProps, PouchTableState> {
	db: PouchDB.Database<T>;
	rows: { loading?: boolean, id: string, doc?: T }[];

	constructor(props: PouchTableProps) {
		super(props);
		this.state = { ready: false };

		this.isRowLoaded = this.isRowLoaded.bind(this);
		this.loadMoreRows = this.loadMoreRows.bind(this);

		this.setDatabase(props.db);
	}

	componentWillReceiveProps(nextProps: PouchTableProps) {
		if (nextProps.db !== this.db) {
			this.setState({ ready: false });
			this.setDatabase(nextProps.db);
		}
	}

	async setDatabase(db: PouchDB.Database<T>) {
		this.db = db;

		const { startkey, endkey, keys } = this.props;
		const res = await this.db.allDocs(keys
			? { keys } as PouchDB.Core.AllDocsWithKeysOptions
			: { startkey, endkey } as PouchDB.Core.AllDocsWithinRangeOptions);
		this.rows = res.rows;

		this.setState({ ready: true });
	}

	isRowLoaded({ index }: IndexParam) {
		const row = this.rows[index];
		return row.doc || row.loading;
	}

	async loadMoreRows(
		{ startIndex, stopIndex }: { startIndex: number, stopIndex: number }
	): Promise<void> {
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
		const { db, ...rest } = this.props;
		console.log(this.rows);

		return (
			<InfiniteLoader
				isRowLoaded={this.isRowLoaded}
				loadMoreRows={this.loadMoreRows}
				rowCount={this.rows.length}
			>
				{({ onRowsRendered, registerChild }: any) => (
					<Table
						onRowsRendered={onRowsRendered}
						ref={registerChild}
						rowCount={this.rows.length}
						rowGetter={({ index }) => this.rows[index].doc || {}}
						{...rest}
					>
						{this.props.children}
					</Table>
				)}
			</InfiniteLoader>
		);
	}
}
