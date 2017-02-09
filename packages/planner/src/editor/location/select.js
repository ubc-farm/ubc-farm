import { createElement as h, PropTypes } from 'react'; /** @jsx h */

const LocationSelect = ({ value, disabled, onChange, options }) => (
	<select {...{ value, disabled, onChange }}>
		<option value="" disabled />
		{Array.from(options, ([id, { name }]) => (
			<option value={id} key={id}>{name}</option>
		))}
	</select>
);

LocationSelect.propTypes = {
	options: PropTypes.instanceOf(Map),
	value: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

export default LocationSelect;
