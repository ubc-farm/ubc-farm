/// <reference path="../../../packages/custom-types/document-promises/index.d.ts" />

import { parsed } from 'document-promises';
import { getLocations, Field } from '@ubc-farm/databases';
import openField from '../src/openField';
import setupEditorMap from '../src/field-editor';
import renderFieldEditorForm from '../src/field-form';

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
		setProperty<K extends keyof Field>(name: K, value: Field[K]) {
			field = Object.assign({}, field);
			field[name] = value;
			renderFieldEditorForm(field, formProps);
		},
		onSubmit: submit,
		onCancel: back,
	};

	const renderField = setupEditorMap((key, geometry) => {
		if (key !== 'geometry') throw new Error();
		field = { ...field, geometry };
		renderFieldEditorForm(field, formProps);
	});

	renderFieldEditorForm(field, formProps);
	if (field.geometry != null) {
		renderField(field);
	}
});
