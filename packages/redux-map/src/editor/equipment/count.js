import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { classlist as cx } from 'ubc-farm-utils';
import { connect } from 'react-redux';
import { setSelectedEquipment } from '../../redux/actions/index.js';
import { selectedEquipment, equipmentList } from '../../redux/selectors.js';

const EquipmentCount = ({ value = '', onChange, invalid }) => (
	<input
		type="number"
		className={cx('equip-count', { invalid })}
		value={value} onChange={onChange}
		data-error={invalid}
		placeholder="0"
	/>
);

EquipmentCount.propTypes = {
	invalid: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default connect(
	(state, { position }) => {
		const [id, count] = selectedEquipment(state)[position];
		const equipment = equipmentList(state);

		if (!equipment.has(id)) return { value: count };

		const { quantity } = equipment.get(id);
		let invalid;
		if (quantity != null && quantity < count) {
			invalid = `There are only ${quantity} of this item`;
		}

		return { value: count, invalid };
	},
	(dispatch, { position }) => ({
		onChange({ target }) {
			dispatch(setSelectedEquipment(position, undefined, target.value));
		},
	})
)(EquipmentCount);
