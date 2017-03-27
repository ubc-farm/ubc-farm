import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';

import ToggleButton from './toggle.js';
import { getIsAdding, toggleAdding } from '../../redux/mapMeta.js';

const AddButton = props => (
	<ToggleButton id="add-toggle" {...props}>
		<i className="material-icons">add</i>
		Add
	</ToggleButton>
);

export default connect(
	state => ({	pressed: getIsAdding(state) }),
	dispatch => ({ onClick() { dispatch(toggleAdding()); } })
)(AddButton);
