import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import reformed from 'react-reformed';
import TaskNameInput from './TaskNameInput.jsx';
import TaskTimeInput from './TaskTimeInput.jsx';
import LocationSelect from './LocationSelect.jsx';
import EquipmentSelect from './EquipmentSelect.jsx';
import DBWrapper from './DBWrapper.jsx';

export default function createEditor(fieldDB, placesDB, equipmentDB) {
	const WrappedLocationSelect = DBWrapper(fieldDB, placesDB)(LocationSelect);
	const WrappedEquipmentSelect = DBWrapper(equipmentDB)(EquipmentSelect);

	const Editor = ({ disabled, model, onSubmit, bindInput }) => (
		<form onSubmit={(e) => { e.preventDefault(); onSubmit(model); }}>
			<TaskNameInput {...{ disabled, bindInput }} />
			<TaskTimeInput {...{ disabled, bindInput }} />
			<WrappedLocationSelect {...{ disabled, bindInput }} />
			<WrappedEquipmentSelect {...{ disabled, bindInput }} />
		</form>
	);

	Editor.propTypes = {
		disabled: PropTypes.bool,
		model: PropTypes.shape({
			name: PropTypes.string,
			start_time: PropTypes.instanceOf(Date),
			end_time: PropTypes.instanceOf(Date),
			location: PropTypes.string,
			equipment: PropTypes.arrayOf(PropTypes.string)
		}).isRequired,
		onSubmit: PropTypes.func.isRequired,
		bindInput: PropTypes.func.isRequired,
	};
	Editor.defaultProps = {
		disabled: false,
	};

	return reformed()(Editor);
}
