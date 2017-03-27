import { reduxForm } from 'redux-form';
import EmployeeForm from './form.js';

export default reduxForm({
	form: 'new-person-extra',
})(EmployeeForm);
