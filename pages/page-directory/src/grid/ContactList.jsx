import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Table, AutoSizer } from 'react-virtualized';
import { connect } from 'react-redux';

import { getDatabase } from '../redux/people.js';
import columnsFromState from './ContactColumn.jsx';

const ContactList = ({ data, columns, onRowClick }) => (
	<AutoSizer>
		{({ height, width }) => (
			<Table
				headerHeight={30}
				height={height}
				rowCount={data.length}
				rowGetter={({ index }) => data[index]}
				rowHeight={50}
				width={width}
				onRowClick={onRowClick}
			>
				{columns}
			</Table>
		)}
	</AutoSizer>
);

export default connect(
	state => ({
		data: getDatabase(state),
		columns: columnsFromState(state),
	})
)(ContactList);
