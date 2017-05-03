import { createElement, SFC } from 'react'; /** @jsx createElement */
import { AutoSizedTable, Column, AutoSizedPouchTableProps } from '@ubc-farm/react-pouch-table';
import { getLocationString, getAcres } from '@ubc-farm/databases';

// TODO: react-pouch-table should be replaced with database-utils' createList

/**
 * A component that displays a list of all fields in the farm.
 */
const FieldList: SFC<AutoSizedPouchTableProps> = ({ db }) => (
	<AutoSizedTable
		headerHeight={30}
		rowHeight={50}
		onRowClick={({ id }) => { window.location.href = `./info?id=${id}`; }}
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
	</AutoSizedTable>
);

export default FieldList;
