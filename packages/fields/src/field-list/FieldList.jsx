import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Table, AutoSizer, Column } from 'react-virtualized';
import { polygonArea, polygonCentroid } from 'd3-polygon';

const FieldList = ({ rows }) => (
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
					cellDataGetter={({ rowData }) => polygonCentroid(rowData.geometry.coordinates[0])}
					cellRenderer={pos => `Lat ${pos[1].toPrecision(2)}, Long ${pos[0].toPrecision(2)}`}
				/>
				<Column
					dataKey="area" label="Area"
					cellDataGetter={({ rowData }) => polygonArea(rowData.geometry.coordinates[0])}
					cellRenderer={area => `${area} m^2`}
				/>
				<Column dataKey="crop" label="Crop Type" />
			</Table>
		)}
	</AutoSizer>
);

FieldList.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.shape({
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
