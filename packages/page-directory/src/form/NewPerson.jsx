import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import reformed from 'react-reformed';

import Field from './Field.jsx';
import RoleSelect from './RoleSelect.jsx';

/**
 * Form section common to all types of people.
 */
const NewPerson = ({ bindInput, model, model: { mailSameAsPhysical } }) => (
	<section className="dir-newperson-container">
		<Field label="Role">
			<RoleSelect {...bindInput('role')} />
		</Field>
		<Field label="Name">
			<input type="text" {...bindInput('name')} />
		</Field>
		<Field label="Email">
			<input type="email" {...bindInput('email')} />
		</Field>
		<Field label="Phone Number">
			<input type="tel" {...bindInput('phoneNumber')} />
		</Field>

		<Field label="Physical Address">
			<textarea {...bindInput('addressPhysical')} />
		</Field>
		<Field label="Mailing Address">
			<textarea
				{...bindInput('addressMailing')}
				value={mailSameAsPhysical ? model.addressPhysical : model.addressMailing}
				disabled={mailSameAsPhysical}
			/>
		</Field>
		<label>
			<input type="checkbox" {...bindInput('mailSameAsPhysical')} />
			<span>Same as Physical Address</span>
		</label>
	</section>
);

NewPerson.propTypes = {
	bindInput: PropTypes.func.isRequired,
	model: PropTypes.shape({
		mailSameAsPhysical: PropTypes.bool,
		addressMailing: PropTypes.string,
		addressPhysical: PropTypes.string,
	}).isRequired
};

export default NewPerson;
