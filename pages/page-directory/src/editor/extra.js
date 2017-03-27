import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import EmployeeForm from './employee/index.js';
import ResearcherForm from './researcher/index.js';

const mainSelector = formValueSelector('new-person');

const ExtraForm = ({ role }) => {
	switch (role.toLowerCase()) {
		case 'employee': return <EmployeeForm />;
		case 'researcher': return <ResearcherForm />;
		default: return null;
	}
};

ExtraForm.propTypes = {
	role: PropTypes.string,
};

export default connect(
	state => {
		const role = mainSelector(state, 'role') || '';

		return {
			role: role.replace(/\s/g, ''),
		};
	}
)(ExtraForm);
