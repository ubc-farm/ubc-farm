import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { setSelectedEquipment } from '../../redux/actions/index.js';
import { selectedEquipment, equipmentList } from '../../redux/selectors.js';

const EquipmentCount = ({ value = '', onChange, max }) => (
	<input
		type="number"
		className="equip-count"
		value={value} onChange={onChange}
		max={max}
		placeholder="0"
	/>
);

EquipmentCount.propTypes = {
	max: PropTypes.number,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default connect(
	(state, { position }) => {
		const [id, count] = selectedEquipment(state)[position];
		const equipment = equipmentList(state);

		if (!equipment.has(id)) return { value: count };

		return {
			value: count,
			max: equipment.get(id).quantity,
		};
	},
	(dispatch, { position }) => ({
		onChange({ target }) {
			dispatch(setSelectedEquipment(position, undefined, target.value));
		},
	})
)(EquipmentCount);
