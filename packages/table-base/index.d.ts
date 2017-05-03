import * as React from 'react';

export interface ColumnProps<T, Row> {
	field: string;
	// children?: React.ReactType;
	isKey?: boolean;
	format?: (cell: T, row: Row) => React.ReactType;
	hidden?: boolean;
	columnClassName?: string | ((cell: T, row: Row, rowIndex: number) => string);
	headerClassName?: string;
	onHeaderClick?: React.ClickEventHandler<any>;
	onCellClick?: (cell: T, row: Row, rowIndex: number) => void;
}
export const Column: React.SFC<ColumnProps<any, any>>;

export interface TableProps<Row> {
	// children: Column[];
	tableData: Row[] | Set<Row> | Map<string, Row> | { [key: string]: Row };
	keyField?: string;
	rowClassName?: string | ((row: Row, rowIndex: number) => string);
	tableClassName?: string;
	headClassName?: string;
	bodyClassName?: string;
	headRowClassName?: string;
	onRowClick?: (row: Row, event: React.ClickEvent<any>) => void;
	onRowMouseEnter?: (row: Row, event: React.SyntheticEvent<any>) => void;
	onRowMouseLeave?: (row: Row, event: React.SyntheticEvent<any>) => void;
	onMouseEnter?: (event: React.SyntheticEvent<any>) => void;
	onMouseLeave?: (event: React.SyntheticEvent<any>) => void;
}

const Table: React.SFC<TableProps>;
export default Table;
