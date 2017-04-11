import { createElement } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { getPeople } from '@ubc-farm/databases';
import { generate } from 'shortid';
import ContactForm from '../src/editor/ContactForm';

async function main(done = () => {}) {
	const [db] = await Promise.all([getPeople(), parsed]);

	render(
		createElement(ContactForm, {
			onDone: done,
			db,
			initialModel: { _id: generate() },
		}),
		document.getElementById('reactRoot'),
	);
}

main(
	() => window.location.href = '../',
)
