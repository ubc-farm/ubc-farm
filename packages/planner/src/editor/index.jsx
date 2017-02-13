import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { isAnySelected } from '../reducer/selected.js';
import { getModel, setEditorProp } from '../reducer/editor.js';
import createEditor from './Editor.jsx';

export default function connectEditor(store, taskDB, equipmentDB, locationDB) {
	const Editor = connect(
		state => ({
			disabled: isAnySelected(state),
			model: getModel(state),
		}),
		dispatch => ({
			onSubmit: model => taskDB.put(model),
			setProperty: (key, value) => dispatch(setEditorProp(key, value)),
		}),
	)(createEditor(equipmentDB, locationDB));

	render(<Editor store={store} />, document.getElementById('reactRoot'));
}
