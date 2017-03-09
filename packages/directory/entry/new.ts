import { createElement } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { getPeople, Person } from '@ubc-farm/databases';
import { generate } from 'shortid';
import ContactForm from '../src/editor/ContactForm';

async function main(done = () => {}, error: (err: Error) => void = () => {}) {
	const [db] = await Promise.all([getPeople(), parsed]);

	function onSubmit(model: Person) {
		const person: Person = Object.assign({}, model);
		person._id = generate();
		return db.put(person).then(done).catch(error);
	}

	render(
		createElement(ContactForm, { onSubmit }),
		document.getElementById('reactRoot'),
	);
}

const logError = console.error.bind(console);
main(
	() => window.location.href = '../',
	logError,
).catch(logError);
