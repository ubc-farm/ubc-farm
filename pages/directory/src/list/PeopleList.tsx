import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person, getRole } from '@ubc-farm/databases';
import PouchTable, { Column } from './PouchTable';

const PeopleList: SFC<{ db: PouchDB.Database<Person> }> = ({ db }) => (
	<PouchTable
		db={db}
		headerHeight={20} rowHeight={30}
		height={800} width={500}
		startkey="person/" endkey="person/\uffff"
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
	</PouchTable>
)

export default PeopleList;
