import { parsed } from 'document-promises';
import { locations, Field } from '@ubc-farm/databases';
import openField from '../src/openField';
import setupEditorMap from '../src/field-editor/index';
import renderFieldEditorForm from '../src/field-form/index';

Promise.all([
	locations,
	locations.then(openField),
	parsed,
]).then(([db, savedField]) => {
	let field: Field = savedField;

	function back() { window.location.href = '/fields'; }
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
