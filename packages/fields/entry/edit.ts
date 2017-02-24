/// <reference path="../../custom-types/document-promises/index.d.ts" />

import { parsed } from 'document-promises';
import { getLocations, Field } from '@ubc-farm/databases';
import openField from '../src/openField';
import setupEditorMap from '../src/field-editor/index';
import renderFieldEditorForm from '../src/field-form/index';

const locations = getLocations();
Promise.all([
	locations,
	locations.then(openField),
	parsed,
]).then(([db, savedField]) => {
	let field: Field = savedField;

	function back() { window.location.href = '/fields'; }
	function submit() { db.put(field).then(back); }

	const formProps = {
		setProperty(name: string, value: any) {
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
	if (field.geometry != null) {
		renderField(field);
	}
});
