import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import EquipmentItem from './item.js';
import { selectedEquipment } from '../../redux/selectors.js';

const EquipmentList = ({ list, invalidMessages }) => (
	<ul className="equip-list">
		{list.map(([equipmentID], index) => (
			<EquipmentItem
				key={index} index={index}
				invalid={invalidMessages.get(equipmentID)}
			/>
		))}
	</ul>
);

EquipmentList.propTypes = {
	list: PropTypes.arrayOf(PropTypes.array),
	invalidMessages: PropTypes.instanceOf(Map),
};

export default connect(
	state => ({
		list: selectedEquipment(state),
	})
)(EquipmentList);
