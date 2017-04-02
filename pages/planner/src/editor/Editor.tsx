import { createElement, PropTypes, StatelessComponent, ChangeEvent } from 'react';
/** @jsx createElement */
import { connectAll, Task, Equipment, Location } from '@ubc-farm/databases';
import TaskNameInput from './TaskNameInput';
import TaskTimeInput from './TaskTimeInput';
import LocationSelect from './LocationSelect';
import EquipmentSelect from './EquipmentSelect';

interface EditorProps {
	disabled: boolean;
	model: Task;
	onSubmit: (model: Task) => void;
	setProperty: (key: string, value: any) => void;
}

export default function createEditor(
	equipmentDB: PouchDB.Database<Equipment>,
	locationDB: PouchDB.Database<Location>
) {
	const connect = connectAll((doc: Equipment|Location) => doc.name, { rowKey: 'options' });
	const WrappedLocationSelect = connect(LocationSelect);
	const WrappedEquipmentSelect = connect(EquipmentSelect);

	const Editor: StatelessComponent<EditorProps> = ({ disabled, model, onSubmit, setProperty }) => {
		const bindInput = (name: string) => ({
			name,
			value: model[name],
			onChange(e: ChangeEvent<any>) { setProperty(name, e.target.value); },
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
