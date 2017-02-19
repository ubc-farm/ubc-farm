import PouchDB from 'pouchdb';
import { Store } from 'redux';
import { Equipment, Location, Task } from '@ubc-farm/databases';
import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { isAnySelected } from '../reducer/selected';
import { getModel, setEditorProp } from '../reducer/editor';
import createEditor from './Editor';

export default function connectEditor(
	store: Store,
	equipmentDB: PouchDB.Database<Equipment>,
	locationsDB: PouchDB.Database<Location>,
	tasksDB: PouchDB.Database<Task>,
) {
	const Editor = createEditor(equipmentDB, locationsDB);
	const ConnectedEditor = connect(
		state => ({
			disabled: isAnySelected(state),
			model: getModel(state),
		}),
		dispatch => ({
			onSubmit: model => tasksDB.put(model),
			setProperty: (key, value) => dispatch(setEditorProp(key, value)),
		}),
	)(Editor);

	render(<ConnectedEditor store={store} />, document.getElementById('reactRoot'));
}
