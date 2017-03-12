import { createElement } from 'react'; /** @jsx createElement */
import { AutoSizer, Table } from 'react-virtualized';
import { connectAll } from '@ubc-farm/databases';

const onRowClickFuncs = [
	'onRowClick',
	'onRowDoubleClick',
	'onRowMouseOut',
	'onRowMouseOver',
	'rowStyle',
];

const stringOrFuncs = [
	'rowHeight',
	'rowClassName',
	'rowHeight',
]

/**
 * React table component that displays items from a PouchDB database.
 * Use columns to define fields that are shown
 */
const ReactPouchTable = (props) => {
	const tableProps = Object.assign({}, props);
	const { rows } = props;

	const funcNames = [
		...onRowClickFuncs.filter(name => props[name]),
		...stringOrFuncs.filter(name => typeof props[name] === 'function'),
	];

	funcNames.forEach((name) => {
		tableProps[name] = ({ index }) => props[name](rows[index] || null);
	});

	return (
		<AutoSizer>
			{size => (
				<Table
					{...size}
					{...tableProps}
					rowCount={rows.length}
					rowGetter={({ index }) => rows[index]}
				/>
			)}
		</AutoSizer>
	);
};

export default connectAll({
	useArray: true,
})(ReactPouchTable);
