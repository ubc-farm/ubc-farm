import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import FieldForm from './FieldForm.jsx';
import FieldEditorToolbar from './FieldEditorToolbar.jsx';

export default function createFieldEditorForm(field, { setProperty, onSubmit, onCancel }) {
	console.log(field);
	render(
		<FieldForm model={field} {...{ setProperty, onSubmit }} />,
		document.getElementById('reactRoot'),
	);
	render(
		<FieldEditorToolbar canSubmit={Boolean(field.name)} {...{ onSubmit, onCancel }} />,
		document.getElementById('toolbar'),
	);
}
