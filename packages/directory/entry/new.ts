import { createElement } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { getPeople, Person } from '@ubc-farm/databases';
import { generate } from 'shortid';
import ContactForm from '../src/editor/ContactForm';

async function main() {
	const [db] = await Promise.all([getPeople(), parsed]);

	function onSubmit(model: Person) {
		const person: Person = Object.assign({}, model);
		person._id = generate();
		return db.put(person);
	}

	render(
		createElement(ContactForm, { onSubmit }),
		document.getElementById('reactRoot'),
	);
}

main().catch(console.error.bind(console));
