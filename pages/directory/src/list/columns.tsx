import { getRole } from '@ubc-farm/databases';
import { createElement } from 'react';

export default [
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
];
