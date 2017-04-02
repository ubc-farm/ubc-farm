import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person, Employee, Researcher } from '@ubc-farm/databases';
import { Field } from '@ubc-farm/react-inputs';
import nestedReformed, { ReformedProps } from './nestedReformed';
import PersonForm from './PersonForm';
import EmployeeForm from './EmployeeForm';
import ResearcherForm from './ResearcherForm';

type AnyPerson = Person | Employee | Researcher;

interface ContactFormProps extends ReformedProps<AnyPerson, keyof AnyPerson> {
	handleSubmit: React.FormEventHandler<any>
}

const ExtraFields: SFC<ContactFormProps> = (props) => {
	switch (props.model.role) {
		case 'employee':
			return <EmployeeForm {...props as ReformedProps<Employee, keyof Employee>} />;
		case 'researcher':
			return <ResearcherForm {...props as ReformedProps<Researcher, keyof Researcher>} />;
		default:
			return null as any;
	}
}

const ContactForm: SFC<ContactFormProps> = (props) => {
	const { bindInput, handleSubmit } = props;

	return (
		<form onSubmit={handleSubmit}>
			<datalist id="roles">
				<option value="employee" />
				<option value="researcher" />
			</datalist>
			<Field type="text" list="roles" {...bindInput('role')}>
				Role
			</Field>
			<PersonForm {...props} />
			<ExtraFields {...props} />
			<input type="submit" />
		</form>
	);
}

export default nestedReformed(ContactForm);
