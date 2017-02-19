import { createElement, PropTypes, SFC } from 'react'; /** @jsx createElement */
import entries from 'lodash/entries';
import { SelectProps } from './IProps';

const LocationSelect: SFC<SelectProps> = ({ bindInput, disabled, options }) => (
	<select disabled={disabled} {...bindInput('location')}>
		<option value="" disabled />
		{entries(options).map(([_id, name]) => (
			<option value={_id} key={_id}>{name}</option>
		))}
	</select>
);

LocationSelect.propTypes = {
	bindInput: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	options: PropTypes.objectOf(PropTypes.string),
};

LocationSelect.defaultProps = {
	disabled: false,
	options: {},
};

export default LocationSelect;
