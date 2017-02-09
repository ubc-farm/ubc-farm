import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { omit } from 'ubc-farm-utils';
import { deleteSelectedEquipment } from '../../redux/actions/index.js';

const RemoveButton = props => (
	<button className="equip-remove" type="button" {...omit(props, 'position')}>
		<i className="material-icons md-18 md-light">remove_circle</i>
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
