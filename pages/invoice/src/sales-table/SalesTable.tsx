import { createElement, Component } from 'react'; /** @jsx createElement */
import { Sale, salePrice } from '@ubc-farm/databases';
import { Table, Column, defaultTableRowRenderer } from 'react-virtualized'

interface SalesTableProps {
	height: number;
	width: number;
	items: Sale[];
	editing: Set<number>;
	onRowChange: (index: number, change: Sale) => void;
}

interface SalesTableState {
	editing: Set<number>;
}

export default class SalesTable extends Component<SalesTableProps, SalesTableState> {
	constructor(props: SalesTableProps) {
		super(props);
		this.state = { editing: new Set() };
	}

	rowRenderer(row) {
		if (!this.state.editing.has(row.index)) {
			return defaultTableRowRenderer(row);
		}

		// TODO render editable row
		return defaultTableRowRenderer(row);
	}

	onRowDoubleClick({ index }) {
		this.setState(state => {
			const editing = new Set(state.editing);
			if (editing.has(index)) editing.delete(index);
			else editing.add(index);
			return { editing };
		});
	}

	render() {
		const { height, width, items } = this.props;
		return (
			<Table
				{...{ height, width }}
				rowCount={items.length}
				rowGetter={({ index }) => items[index]}
				headerHeight={30}
				rowHeight={50}
			>
				<Column label="Item" dataKey="item" width={140} />
				<Column label="Description" dataKey="description" width={200} />
				<Column label="Unit Cost" dataKey="unitCost" width={100} />
				<Column label="Quantity" dataKey="quantity" width={100} />
				<Column
					label="Price" dataKey="price" width={100}
					cellDataGetter={({ rowData }) => salePrice(rowData)}
				/>
			</Table>
		);
	}
}
