import { createElement, PropTypes, SFC } from 'react'; /** @jsx createElement */
import { ReactPouchTable, Column, ReactPouchTableProps } from '@ubc-farm/react-pouch-table';
import { getLocationString, getAcres, Field } from '@ubc-farm/databases';

/**
 * A component that displays a list of all fields in the farm.
 */
const FieldList: SFC<ReactPouchTableProps<Field>> = ({ db }) => (
	<ReactPouchTable
		headerHeight={30}
		rowHeight={50}
		onRowClick={({ _id }) => {
			window.location.href = `./info?id=${_id}`;
		}}
		db={db}
	>
		<Column dataKey="name" label="Field" width={140} />
		<Column
			dataKey="location" label="Location" width={140}
			cellDataGetter={({ rowData }) => getLocationString(rowData)}
		/>
		<Column
			dataKey="area" label="Area" width={140}
			cellDataGetter={({ rowData }) => getAcres(rowData)}
		/>
		<Column dataKey="crop" label="Crop Type" width={140} />
	</ReactPouchTable>
);

export default FieldList;
