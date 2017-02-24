import { createElement, PropTypes, SFC } from 'react'; /** @jsx createElement */
import Select from 'react-select';
import { SelectProps } from './IProps';

const EquipmentSelect: SFC<SelectProps> = ({ disabled, bindInput, options }) => (
	<label className="editor-input-wrapper">
		<span className="editor-label">Equipment</span>
		<Select
			multi
			className="editor-input" disabled={disabled}
			options={Object.entries(options).map(([value, label]) => ({ value, label }))}
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
