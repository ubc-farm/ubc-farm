import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person, getRole } from '@ubc-farm/databases';
import { ReactPouchTable, Column, ReactPouchTableProps } from '@ubc-farm/react-pouch-table';

const PeopleList: SFC<ReactPouchTableProps<Person>> = ({ db }) => (
	<ReactPouchTable
		headerHeight={30}
		rowHeight={50}
		db={db}
	>
		<Column label="Name" dataKey="name" width={140} />
		<Column
			label="Role" dataKey="role" width={140}
			cellDataGetter={({ rowData }) => getRole(rowData)}
		/>
		<Column
			label="Email" dataKey="email"	width={140}
			cellRenderer={({ cellData: email }) => {
				if (email == null) return '';
				return <a href={`mailto:${email}`} title="Send email">{email}</a>;
			}}
		/>
		<Column label="Phone" dataKey="phone.number" width={140} />
	</ReactPouchTable>
);

export default PeopleList;
