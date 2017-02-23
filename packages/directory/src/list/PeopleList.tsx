import { createElement, SFC } from 'react'; /** @jsx createElement */
import { AutoSizer, Table, Column } from 'react-virtualized';
import { Person } from '@ubc-farm/databases';

const PeopleList: SFC<{ rows: Map<string, Person> }> = ({ rows }) => {
	const values = [...rows.values()];
	return (
		<AutoSizer>
			{size => (
				<Table
					{...size}
					headerHeight={30}
					rowHeight={50}
					rowCount={values.length}
					rowGetter={({ index }) => values[index]}
				>
					<Column label="Name" dataKey="name" width={140} />
					<Column label="Role" dataKey="role" width={140} />
					<Column
						label="Email" dataKey="email"
						width={140}
						cellRenderer={({ cellData: email }) => {
							if (email == null) return '';
							return <a href={`mailto:${email}`} title="Send email">{email}</a>;
						}}
					/>
					<Column label="Phone" dataKey="phone.number" width={140} />
				</Table>
			)}
		</AutoSizer>
	)
};

export default PeopleList;
