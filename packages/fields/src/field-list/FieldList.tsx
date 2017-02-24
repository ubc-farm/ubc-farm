import { createElement, PropTypes, SFC } from 'react'; /** @jsx createElement */
import { Table, AutoSizer, Column } from 'react-virtualized';
import { getLocationString, getAcres, Field } from '@ubc-farm/databases';

/**
 * A component that displays a list of all fields in the farm.
 */
const FieldList: SFC<{ rows: Field[] }> = ({ rows }) => (
	<AutoSizer>
		{(size: { height: number, width: number }) => (
			<Table
				{...size}
				headerHeight={30}
				rowCount={rows.length}
				rowGetter={({ index }) => rows[index]}
				rowHeight={50}
				onRowClick={({ index }) => {
					const { _id } = rows[index];
					window.location.href = `./info?id=${_id}`;
				}}
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
			</Table>
		)}
	</AutoSizer>
);

FieldList.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		name: PropTypes.string,
		geometry: PropTypes.shape({
			type: PropTypes.oneOf(['Feature']),
			coordinates: PropTypes.arrayOf(
				PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
			),
		}),
		crop: PropTypes.string,
	})).isRequired,
};

export default FieldList;
