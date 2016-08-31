import { createElement } from 'react'; /** @jsx createElement */
import { reduxForm, propTypes, FieldArray } from 'react-redux';

import Caption from './toolbar/index.js';
import THead from './head/index.js';
import Rows from './row/index.js';
import Footer from './footer/index.js';

const Table = () => (
	<table>
		<Caption />
		<THead />
		<FieldArray name="rows" component={Rows} />
		<Footer />
	</table>
);

const Form = ({ handleSubmit }) => (
	<form onSubmit={handleSubmit} id="invoice">
		<Table />
	</form>
);
Form.propTypes = propTypes;

export default reduxForm({ form: 'invoice' })(Form);
