import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { classList as cx } from 'ubc-farm-utils';

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

export default EquipmentCount;
