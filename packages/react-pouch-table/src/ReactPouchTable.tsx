import { createElement, SFC } from 'react'; /** @jsx createElement */
import { AutoSizer, Table, TableProps } from 'react-virtualized';
import { connectAll } from '@ubc-farm/databases';

const ReactPouchTable: SFC<TableProps & { rows: any[] }> = (props) => {
	const tableProps = Object.assign({}, props);

	return (
		<AutoSizer>
			{(size: { height: number, width: number }) => (
				<Table
					{...size}
					{...tableProps}
					rowCount={props.rows.length}
					rowGetter={({ index }) => props.rows[index]}
				>
					{props.children}
				</Table>
			)}
		</AutoSizer>
	);
};

export default connectAll({
	useArray: true,
})(ReactPouchTable);
