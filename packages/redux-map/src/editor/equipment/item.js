import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import EquipmentCount from './count.js';
import EquipmentSelector from './select.js';
import RemoveButton from './remove.js';

const EquipmentItem = ({
	value: [itemId, count], invalid, options,
	onCountChange, onItemChange, equipment,
}) => (
	<li className="equip-item">
		<EquipmentCount value={count} invalid={invalid} onChange={onCountChange} />
		<EquipmentSelector
			options={options}
			value={itemId} onChange={onItemChange}
		/>
		<RemoveButton equipment={equipment} />
	</li>
);

EquipmentItem.propTypes = {
	invalid: PropTypes.string,
	value: PropTypes.array.isRequired,
	onCountChange: PropTypes.func.isRequired,
	onItemChange: PropTypes.func.isRequired,
	onRemoveClick: PropTypes.func.isRequired,
	options: PropTypes.instanceOf(Map),
	equipment: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default EquipmentItem;
