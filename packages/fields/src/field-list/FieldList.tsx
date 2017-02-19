import { createElement, PropTypes, StatelessComponent } from 'react'; /** @jsx createElement */
import { Table, AutoSizer, Column } from 'react-virtualized';
import { getLocationString, getAcres } from '@ubc-farm/databases';

const FieldList: StatelessComponent = ({ rows }) => (
	<AutoSizer>
		{({ height, width }) => (
			<Table
				headerHeight={30}
				height={height}
				rowCount={rows.length}
				rowGetter={({ index }) => rows[index]}
				rowHeight={50}
				width={width}
				onRowClick={({ index }) => {
					const { _id } = rows[index];
					window.location.href = `./info?id=${_id}`;
				}}
			>
				<Column dataKey="name" label="Field" />
				<Column
					dataKey="location" label="Location"
					cellDataGetter={({ rowData }) => getLocationString(rowData)}
				/>
				<Column
					dataKey="area" label="Area"
					cellDataGetter={({ rowData }) => getAcres(rowData)}
				/>
				<Column dataKey="crop" label="Crop Type" />
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
