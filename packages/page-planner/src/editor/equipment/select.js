import { createElement as h, PropTypes } from 'react'; /** @jsx h */

const EquipmentSelector = ({ value = '', onChange, options }) => (
	<select value={value} onChange={onChange} className="equip-choose">
		<option value="" disabled />
		{Array.from(options, ([id, { name }]) => (
			<option value={id} key={id}>{name}</option>
		))}
	</select>
);

EquipmentSelector.propTypes = {
	options: PropTypes.instanceOf(Map),
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default EquipmentSelector;
