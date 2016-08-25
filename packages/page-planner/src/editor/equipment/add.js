import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { addSelectedEquipment } from '../../redux/actions/index.js';

const AddButton = props => (
	<button className="equip-add" {...props}>
		<i className="material-icons">add_circle</i>
		Add Equipment to Task
	</button>
);

export default connect(
	undefined,
	dispatch => ({
		onClick() {
			console.log('foo');
			dispatch(addSelectedEquipment());
		},
	})
)(AddButton);
