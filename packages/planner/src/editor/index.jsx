import tasks from '@ubc-farm/databases/src/tasks.js';
import equipment from '@ubc-farm/databases/src/equipment.js';
import locations from '@ubc-farm/databases/src/locations.js';
import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { isAnySelected } from '../reducer/selected.js';
import { getModel, setEditorProp } from '../reducer/editor.js';
import createEditor from './Editor.jsx';

export default function connectEditor(store) {
	const Editor = connect(
		state => ({
			disabled: isAnySelected(state),
			model: getModel(state),
		}),
		dispatch => ({
			onSubmit: model => tasks.put(model),
			setProperty: (key, value) => dispatch(setEditorProp(key, value)),
		}),
	)(createEditor(equipment, locations));

	render(<Editor store={store} />, document.getElementById('reactRoot'));
}
