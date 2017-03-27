import {connect} from 'react-redux';
import {toggleResizing, toggleAdding} from '../redux/actions.js';
import {resizableSelector, addModeSelector} from '../redux/selectors.js';

import ActionToolbar from './with-buttons.js';

export default connect(
	state => ({
		adding: addModeSelector(state),
		resizing: resizableSelector(state)
	}),
	dispatch => ({
		onResize: () => dispatch(toggleResizing()),
		onAdd: () => dispatch(toggleAdding())
	})
)(ActionToolbar);