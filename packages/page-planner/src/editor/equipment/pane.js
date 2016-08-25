import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import EquipmentList from './list.js';
import AddButton from './add.js';
import { selectedTask } from '../../redux/selectors.js';

const EquipmentSection = props => (
	<fieldset disabled={props.disabled}>
		<EquipmentList {...props} />
		<AddButton />
	</fieldset>
);

EquipmentSection.propTypes = {
	disabled: PropTypes.bool,
};

export default connect(
	state => ({
		disabled: !selectedTask(state),
	})
)(EquipmentSection);
