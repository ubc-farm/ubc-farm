import { parsed } from 'document-promises';
import { locations } from '@ubc-farm/databases';
import setupEditorMap from '../src/field-editor/index.js';
import renderFieldEditorForm from '../src/field-form/index.jsx';

Promise.all([locations, parsed]).then(([db]) => {
	let field = {};

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

	setupEditorMap((n, geometry) => {
		field = Object.assign({}, field, { geometry });
		renderFieldEditorForm(field, formProps);
	});

	renderFieldEditorForm(field, formProps);
});
