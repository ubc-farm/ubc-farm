import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person, Employee, Researcher } from '@ubc-farm/databases';
import { Field, reformed, ReformedProps } from '@ubc-farm/react-inputs';
import { DocEditor } from '@ubc-farm/react-doc-editor';
import PersonForm from './PersonForm';
import EmployeeForm from './EmployeeForm';
import ResearcherForm from './ResearcherForm';

type AnyPerson = Person | Employee | Researcher;

interface ContactFormProps extends ReformedProps<AnyPerson> {
	onDone(): void,
	db: PouchDB.Database<AnyPerson>,
}

const ExtraFields: SFC<ContactFormProps> = (props) => {
	switch (props.model.role) {
		case 'employee':
			return <EmployeeForm {...props as ReformedProps<Employee>} />;
		case 'researcher':
			return <ResearcherForm {...props as ReformedProps<Researcher>} />;
		default:
			return null as any;
	}
}

const ContactForm: SFC<ContactFormProps> = (props) => {
	return (
		<DocEditor {...props}>
			<datalist id="roles">
				<option value="employee" />
				<option value="researcher" />
			</datalist>
			<Field label="Role" name="role">
				<input
					className="input" list="roles" type="text"
					{...props.bindInput('role')}
				/>
			</Field>

			<PersonForm {...props} />
			<ExtraFields {...props} />
		</DocEditor>
	);
}

export default reformed()(ContactForm);
