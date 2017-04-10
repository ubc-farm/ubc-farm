import { parsed } from 'document-promises';
import { getLongTerm, LongTermEntry } from '@ubc-farm/databases';
import { createElement, SFC } from 'react';
import { render } from 'react-dom';
import { NumEmployed, Sales } from '../src';

const Main: SFC<{ data: LongTermEntry[] }> = ({ data }) => (
	<div>
		<h1>Number of Employees</h1>
		<NumEmployed data={data} />

		<h1>Sales</h1>
		<Sales data={data} />
	</div>
)

Promise.all([
	getLongTerm().then(db => db.allDocs({ include_docs: true })),
	parsed,
]).then(([{ rows }]) => {
	render(
		createElement(Main, { data: rows }),
		document.getElementById('reactRoot'),
	);
})
