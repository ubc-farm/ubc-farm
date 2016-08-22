import { createElement } from 'react'; /** @jsx createElement */
import { Field, reduxForm, propTypes } from 'redux-form';

import RelationSelect from './links.js';
import submitForm from './submit.js';

const parseID = value => parseInt(value, 10);

const ItemForm = ({ handleSubmit, pristine, submitting }) => (
	<form onSubmit={handleSubmit}>
		<label>
			<span className="label-body">Product</span>
			<Field
				component={RelationSelect}
				name="product"
				url="/api/items"
				parse={parseID}
			/>
		</label>

		<label>
			<span className="label-body">Location</span>
			<Field
				component={RelationSelect}
				name="location"
				url="/api/locations"
				parse={parseID}
			/>
		</label>

		<label>
			<span className="label-body">Quantity</span>
			<Field component="input" type="number" name="quantity" />
		</label>

		<label>
			<span className="label-body">Purchase Date</span>
			<Field component="input" type="date" name="purchaseDate" />
		</label>

		<div>
			<label htmlFor="description">Description</label>
			<Field component="textarea" name="description" />
		</div>

		<button type="submit" disabled={pristine || submitting}>Submit</button>
	</form>
);

ItemForm.propTypes = propTypes;

export default reduxForm({
	form: 'new-equipment',
	onSubmit: submitForm,
	onSubmitSuccess(result) {
		console.log(result);
	},
})(ItemForm);
