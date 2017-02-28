import { SFC, ReactType } from 'react';
import { TableProps, Column, SortDirection } from 'react-virtualized';
import * as PouchDB from 'pouchdb';

export interface ReactPouchTableProps<T> {
	db: PouchDB.Database<T>;
	children: Column[] | Column;
	className?: string;
	disableHeader?: boolean;
	estimatedRowSize?: number;
	gridClassName?: string;
	gridStyle?: Object;
	headerClassName?: string;
	headerHeight: string;
	headerStyle?: Object;
	id?: string;
	noRowsRenderer?: () => ReactType;
	onHeaderClick?: (dataKey: string, columnData: any) => void;
	onRowClick?: (row: T) => void;
	onRowDoubleClick?: (row: T) => void;
	onRowMouseOut?: (row: T) => void;
	onRowMouseOver?: (row: T) => void;
	overscanRowCount?: number;
	onScroll?: ({ clientHeight: number, scrollHeight: number, scrollTop: number }) => void;
	rowClassName?: string | (row: T | null) => string;
	rowHeight: number | (row: T) => number;
	rowRenderer?: Function,
	rowStyle?: Object | (row: T | null) => Object;
	scrollToAlignment?: 'auto' | 'start' | 'end' | 'center';
	scrollToIndex?: number;
	scrollTop?: number;
	sort?: ({ sortBy: string, sortDirection: SortDirection }) => void;
	sortBy?: string;
	sortDirection?: SortDirection;
	style?: Object;
	tabIndex?: number;
};

/**
 * React table component that displays items from a PouchDB database.
 * Use columns to define fields that are shown
 */
export const ReactPouchTable: SFC<ReactPouchTableProps<any>>;
export default ReactPouchTable;
export { Column } from 'react-virtualized';
