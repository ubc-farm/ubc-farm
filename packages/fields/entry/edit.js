import { parsed } from 'document-promises';
import { locations } from '@ubc-farm/databases';
import openField from '../src/openField.ts';
import setupEditorMap from '../src/field-editor/index.ts';
import renderFieldEditorForm from '../src/field-form/index.jsx';

Promise.all([
	locations,
	locations.then(openField),
	parsed,
]).then(([db, savedField]) => {
	let field = savedField;

	function back() { window.location = '/fields'; }
	function submit() { db.put(field).then(back); }

	const formProps = {
		setProperty(name, value) {
			field = Object.assign({}, field, { [name]: value });
			renderFieldEditorForm(field, formProps);
		},
		onSubmit: submit,
		onCancel: back,
	};

	const renderField = setupEditorMap((n, geometry) => {
		field = Object.assign({}, field, { geometry });
		renderFieldEditorForm(field, formProps);
	});

	renderFieldEditorForm(field, formProps);
	renderField(field);
});
