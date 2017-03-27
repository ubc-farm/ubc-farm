import { reduxForm } from 'redux-form';
import ResearcherForm from './form.js';

export default reduxForm({
	form: 'new-person-extra',
})(ResearcherForm);
