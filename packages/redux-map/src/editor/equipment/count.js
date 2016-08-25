import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { classlist as cx } from 'ubc-farm-utils';
import { connect } from 'react-redux';
import { setSelectedEquipment } from '../../redux/actions/index.js';
import { selectedEquipment } from '../../redux/selectors.js';

const EquipmentCount = ({ value = '', onChange, invalid }) => (
	<input
		type="number"
		className={cx('equip-count', { invalid })}
		value={value} onChange={onChange}
		data-error={invalid}
	/>
);

EquipmentCount.propTypes = {
	invalid: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default connect(
	(state, { position }) => {
		const [, count] = selectedEquipment(state)[position];
		return { value: count };
	},
	(dispatch, { position }) => ({
		onChange({ target }) {
			dispatch(setSelectedEquipment(position, undefined, target.value));
		},
	})
)(EquipmentCount);
