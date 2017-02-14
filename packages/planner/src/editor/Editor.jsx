import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import TaskNameInput from './TaskNameInput.jsx';
import TaskTimeInput from './TaskTimeInput.jsx';
import LocationSelect from './LocationSelect.jsx';
import EquipmentSelect from './EquipmentSelect.jsx';
import DBWrapper from './DBWrapper.jsx';

export default function createEditor(equipmentDB, locationDB) {
	const WrappedLocationSelect = DBWrapper(
		'options', 'doc.name', locationDB,
	)(LocationSelect);
	const WrappedEquipmentSelect = DBWrapper(
		'options', 'doc.name', equipmentDB,
	)(EquipmentSelect);

	const Editor = ({ disabled, model, onSubmit, setProperty }) => {
		const bindInput = name => ({
			name,
			value: model[name],
			onChange(e) { setProperty(name, e.target.value); },
		});

		return (
			<form onSubmit={(e) => { e.preventDefault(); onSubmit(model); }}>
				<TaskNameInput {...{ disabled, bindInput }} />
				<TaskTimeInput {...{ disabled, bindInput }} />
				<WrappedLocationSelect {...{ disabled, bindInput }} />
				<WrappedEquipmentSelect {...{ disabled, bindInput }} />
				<button type="submit">Submit</button>
			</form>
		);
	};

	Editor.propTypes = {
		disabled: PropTypes.bool,
		model: PropTypes.shape({
			name: PropTypes.string,
			start: PropTypes.instanceOf(Date),
			end: PropTypes.instanceOf(Date),
			location: PropTypes.string,
			equipment: PropTypes.arrayOf(PropTypes.string)
		}).isRequired,
		onSubmit: PropTypes.func.isRequired,
		setProperty: PropTypes.func.isRequired,
	};
	Editor.defaultProps = {
		disabled: false,
	};

	return Editor;
}
