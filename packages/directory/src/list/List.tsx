import { createElement, SFC } from 'react'; /** @jsx createElement */
import { AutoSizer, Table, Column } from 'react-virtualized';
import { Person } from '@ubc-farm/databases';

const PeopleList: SFC<{ rows: Person[] }> = ({ rows }) => (
	<AutoSizer>
		{size => (
			<Table
				{...size}
				headerHeight={30}
				rowHeight={50}
				rowCount={rows.length}
				rowGetter={({ index }) => rows[index]}
			>
				<Column dataKey="name" />
				<Column dataKey="role" />
				<Column dataKey="email"
					cellRenderer={({ cellData: email }) => {
						if (email == null) return '';
						return <a href={`mailto:${email}`} title="Send email">{email}</a>;
					}}
				/>
				<Column dataKey="phone.number" />
			</Table>
		)}
	</AutoSizer>
);
