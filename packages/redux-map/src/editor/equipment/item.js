import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import EquipmentCount from './count.js';
import EquipmentSelector from './select.js';
import RemoveButton from './remove.js';

const EquipmentItem = ({ index, invalid }) => (
	<li className="equip-item">
		<EquipmentCount position={index} invalid={invalid} />
		<EquipmentSelector position={index} />
		<RemoveButton position={index} />
	</li>
);

EquipmentItem.propTypes = {
	invalid: PropTypes.string,
	index: PropTypes.number.isRequired,
};

export default EquipmentItem;
