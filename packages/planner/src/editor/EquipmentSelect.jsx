import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import Select from 'react-select';
import entries from 'lodash/entries';

const EquipmentSelect = ({ disabled, bindInput, options }) => (
	<label className="editor-input-wrapper">
		<span className="editor-label">Equipment</span>
		<Select
			multi
			className="editor-input" disabled={disabled}
			options={entries(options).map(([value, label]) => ({ value, label }))}
			{...bindInput('equipment')}
		/>
	</label>
);

EquipmentSelect.propTypes = {
	options: PropTypes.objectOf(PropTypes.string).isRequired,
	bindInput: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

EquipmentSelect.defaultProps = {
	disabled: false,
};

export default EquipmentSelect;
