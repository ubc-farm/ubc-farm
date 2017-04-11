import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person, getRole } from '@ubc-farm/databases';
import { BootstrapTable, TableHeaderColumn as Column } from 'react-bootstrap-table';

const PeopleList: SFC<{ data: Person[] }> = ({ data }) => (
	<BootstrapTable
		className="table"
		data={data}
		keyField="_id"
	>
		<Column dataField="name">Name</Column>
		<Column
			label="Role" dataField="role"
			dataFormat={(cell, row: Person) => getRole(row)}
		>
			Role
		</Column>
		<Column
			dataField="email"
			dataFormat={(email) => {
				if (email == null) return '';
				return <a href={`mailto:${email}`} title="Send email">{email}</a>;
			}}
		>
			Email
		</Column>
		<Column dataField="phone.number">
			Phone
		</Column>
	</BootstrapTable>
)

export default PeopleList;
