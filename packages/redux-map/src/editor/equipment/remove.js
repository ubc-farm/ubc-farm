import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { deleteSelectedEquipment } from '../../redux/actions/index.js';

const RemoveButton = props => (
	<button className="equip-remove" {...props}>
		<i className="material-icons md-18">remove_circle</i>
	</button>
);

export default connect(
	undefined,
	(dispatch, { position }) => ({
		onClick() {
			dispatch(deleteSelectedEquipment(position));
		},
	})
)(RemoveButton);
