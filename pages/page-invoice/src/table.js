import { createElement } from 'react'; /** @jsx createElement */
// TODO: replace with 'redux-form' when FieldArray bug is fixed
import { reduxForm, propTypes, FieldArray } from '../../node_modules/redux-form/es/index.js';

import DataList from './details/datalist.js';
import Caption from './toolbar/index.js';
import THead from './head/index.js';
import Rows from './row/index.js';
import Footer from './footer/index.js';

const Table = () => (
	<table className="invoice-table">
		<Caption />
		<THead />
		<FieldArray name="rows" component={Rows} />
		<Footer />
	</table>
);

const Form = ({ handleSubmit }) => (
	<form onSubmit={handleSubmit} id="invoice">
		<Table />
		<DataList />
	</form>
);
Form.propTypes = propTypes;

export default reduxForm({ form: 'invoice' })(Form);
