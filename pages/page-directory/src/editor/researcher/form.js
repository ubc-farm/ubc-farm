import { createElement as h } from 'react'; /** @jsx h */
import { Field } from 'redux-form';

const ResearcherSection = () => (
	<fieldset name="employee_info">
		<label>
			<span className="label-body">Position</span>
			<Field component="input" type="text" name="position" />
		</label>
		<label>
			<span className="label-body">Faculty</span>
			<Field component="input" type="text" name="faculty" />
		</label>
		<label>
			<span className="label-body">Department</span>
			<Field component="input" type="text" name="department" />
		</label>
		<label>
			<span className="label-body">Lab Website</span>
			<Field component="input" type="url" name="labWebsite" />
		</label>
		<label>
			<span className="label-body">Expertise</span>
			<Field component="input" type="text" name="expertise" />
		</label>
		<div>
			<label htmlFor="coursesTaught">Courses Taught</label>
			<Field component="textarea" name="coursesTaught" id="coursesTaught" />
		</div>
	</fieldset>
);

export default ResearcherSection;
