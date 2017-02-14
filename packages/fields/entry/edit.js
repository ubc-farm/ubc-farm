import { parsed } from 'document-promises';
import db from '@ubc-farm/databases/src/locations.js';
import openField from '../src/openField.js';
import setupEditorMap from '../src/field-editor/index.js';
import renderFieldEditorForm from '../src/field-form/index.jsx';

Promise.all([openField(db), parsed]).then(([savedField]) => {
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
