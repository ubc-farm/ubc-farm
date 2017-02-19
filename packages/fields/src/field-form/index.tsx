import { createElement, MouseEventHandler } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { Field } from '../IField';
import FieldForm from './FieldForm';
import FieldEditorToolbar from './FieldEditorToolbar';

export default function createFieldEditorForm(
	field: Field,
	{ setProperty, onSubmit, onCancel }: {
		setProperty: (key: string, value: any) => void,
		onSubmit: () => void,
		onCancel: MouseEventHandler
	}
) {
	render(
		<FieldForm model={field} {...{ setProperty, onSubmit }} />,
		document.getElementById('reactRoot'),
	);
	render(
		<FieldEditorToolbar canSubmit={Boolean(field.name)} {...{ onSubmit, onCancel }} />,
		document.getElementById('toolbar'),
	);
}
