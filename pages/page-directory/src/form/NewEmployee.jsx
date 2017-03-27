import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import reformed from 'react-reformed';
import { set } from 'lodash';

import Select from 'react-select';
import Field from './Field.jsx';
import WorkingDays from './WorkingDays.jsx';

function setNestedProperty(model, setModel, path, value) {
	const newModel = Object.assign({}, model);
	set(newModel, path, value);
	return setModel(newModel);
}

const NewEmployee = ({ bindInput, model, setModel }) => (
	<section className="dir-newemployee-container">
		<Field label="Pay">
			<input type="text" {...bindInput('pay')} />
		</Field>
		<Field label="Employment Type">
			<Select
				{...bindInput('employmentType')}
				options={[
					{ value: 'fullTime', label: 'Full Time' },
					{ value: 'partTime', label: 'Part Time' },
				]}
			/>
		</Field>
		<WorkingDays model={model} setModel={setModel} />

	</section>
);

NewPerson.propTypes = {
	bindInput: PropTypes.func.isRequired,
	model: PropTypes.shape({

	}).isRequired
};

export default NewPerson;
