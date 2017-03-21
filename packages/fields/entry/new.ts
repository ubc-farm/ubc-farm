/// <reference path="../../custom-types/document-promises/index.d.ts" />

import { parsed } from 'document-promises';
import { generate } from 'shortid';
import { getLocations, Field } from '@ubc-farm/databases';
import setupEditorMap from '../src/field-editor/index';
import renderFieldEditorForm from '../src/field-form/index';

Promise.all([getLocations(), parsed]).then(([db]) => {
	let field: Field = { _id: generate(), _rev: '', name: '' };

	function back() { window.location.href = '/fields'; }
	function submit() { db.put(field).then(back); }

	const formProps = {
		setProperty<K extends keyof Field>(name: K, value: Field[K]) {
			field = Object.assign({}, field);
			field[name] = value;
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
