import { parsed } from 'document-promises';
import { locations, Field } from '@ubc-farm/databases';
import setupEditorMap from '../src/field-editor/index';
import renderFieldEditorForm from '../src/field-form/index';

Promise.all([locations, parsed]).then(([db]) => {
	let field = {};

	function back() { window.location.href = '/fields'; }
	function submit() { db.put(field).then(back); }

	const formProps = {
		setProperty(name, value) {
			field = Object.assign({}, field, { [name]: value });
			renderFieldEditorForm(<Field> field, formProps);
		},
		onSubmit: submit,
		onCancel: back,
	};

	setupEditorMap((n, geometry) => {
		field = Object.assign({}, field, { geometry });
		renderFieldEditorForm(<Field> field, formProps);
	});

	renderFieldEditorForm(<Field> field, formProps);
});
