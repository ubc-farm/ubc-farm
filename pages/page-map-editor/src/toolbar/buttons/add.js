import { createElement as h } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import ToggleButton from './toggle.js';

import { addModeSelector } from '../../redux/selectors.js';
import { toggleAdding } from '../../redux/actions/index.js';

const AddButton = props => (
	<ToggleButton id="add-toggle" {...props}>
		<i className="material-icons">add</i>
		Add
	</ToggleButton>
);

export default connect(
	state => ({
		checked: addModeSelector(state),
	}),
	dispatch => ({
		onChange() { dispatch(toggleAdding()); },
	})
)(AddButton);
