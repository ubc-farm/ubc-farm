import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person } from '@ubc-farm/databases';
import { Field } from '@ubc-farm/react-inputs';
import { ReformedProps, InputProps } from './nestedReformed';

/**
 * Form with person fields
 */
const PersonForm: SFC<ReformedProps<Person, keyof Person>> = ({ bindInput }) => (
	<fieldset>
		<Field type="text" {...bindInput('name')}>Name</Field>
		<Field type="email" {...bindInput('email')}>Email</Field>
		<Field type="tel" {...bindInput('phone.number' as 'phone')}>Phone</Field>
		<div className="field-container">
			<label htmlFor="addressMailing">Mailing Address</label>
			<textarea id="addressMailing" {...bindInput('addressMailing') as InputProps<string>} />
		</div>
		<div className="field-container">
			<label htmlFor="addressPhysical">Physical Address</label>
			<textarea id="addressPhysical" {...bindInput('addressPhysical') as InputProps<string>} />
		</div>
	</fieldset>
);

export default PersonForm;
