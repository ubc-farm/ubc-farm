import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connectAll } from '@ubc-farm/databases';
import TaskNameInput from './TaskNameInput.jsx';
import TaskTimeInput from './TaskTimeInput.jsx';
import LocationSelect from './LocationSelect.jsx';
import EquipmentSelect from './EquipmentSelect.jsx';

export default function createEditor(equipmentDB, locationDB) {
	const connect = connectAll(doc => doc.name, { rowKey: 'options' });
	const WrappedLocationSelect = connect(LocationSelect);
	const WrappedEquipmentSelect = connect(EquipmentSelect);

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
				<WrappedLocationSelect db={locationDB} {...{ disabled, bindInput }} />
				<WrappedEquipmentSelect db={equipmentDB} {...{ disabled, bindInput }} />
				<button type="submit">Submit</button>
			</form>
		);
	};

	Editor.propTypes = {
		disabled: PropTypes.bool,
		model: PropTypes.shape({
			name: PropTypes.string,
			start: PropTypes.any,
			end: PropTypes.any,
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
