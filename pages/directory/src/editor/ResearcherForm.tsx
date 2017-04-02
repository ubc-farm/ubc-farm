import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Researcher } from '@ubc-farm/databases';
import { Field } from '@ubc-farm/react-inputs';
import { ReformedProps, InputProps } from './nestedReformed';

/**
 * Form with researcher fields
 */
const ResearcherForm: SFC<ReformedProps<Researcher, keyof Researcher>> = ({ bindInput }) => (
	<fieldset>
		<Field type="text" {...bindInput('position')}>Position</Field>
		<Field type="text" {...bindInput('faculty')}>Faculty</Field>
		<Field type="text" {...bindInput('department')}>Department</Field>
		<Field type="url" {...bindInput('labWebsite')}>Lab Website</Field>
		<div className="field-container">
			<label htmlFor="expertise">Expertise</label>
			<textarea id="expertise" {...bindInput('expertise') as InputProps<string>} />
		</div>
		<div className="field-container">
			<label htmlFor="coursesTaught">Courses Taught</label>
			<textarea id="coursesTaught" {...bindInput('coursesTaught') as InputProps<string>} />
		</div>
		<div className="field-container">
			<label htmlFor="projects">Projects</label>
			<textarea id="projects" {...bindInput('projects') as InputProps<string>} />
		</div>
	</fieldset>
);

export default ResearcherForm;
