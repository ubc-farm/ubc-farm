import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person, getRole } from '@ubc-farm/databases';
import ReactTable from 'react-table';

const PeopleList: SFC<{ data: Person[] }> = ({ data }) => (
	<ReactTable
		data={data || []}
		loading={!data}
		keyField="_id"
		columns={[
			{
				header: 'Name',
				accessor: 'name',
			},
			{
				header: 'Role',
				id: 'role',
				accessor: getRole,
			},
			{
				header: 'Email',
				accessor: 'email',
				render({ value }) {
					if (value == null) return '';
					return <a href={`mailto:${value}`} title="Send email">{value}</a>;
				}
			},
			{
				header: 'Phone',
				id: 'phone.number',
				accessor: d => d.phone ? d.phone.number : null,
			},
		]}
	/>
)

export default PeopleList;
