import { createElement } from 'react'; /** @jsx createElement */
import { Field, reduxForm, propTypes } from 'redux-form';

import DurationInput from 'ubc-farm-inputs/duration.js';
import MoneyInput, { validate as validMoney } from 'ubc-farm-inputs/money.js';

import submitForm from './submit-item.js';

const ItemForm = ({ handleSubmit, pristine, submitting }) => (
	<form onSubmit={handleSubmit}>
		<label>
			<span className="label-body">Name</span>
			<Field component="input" type="text" name="name" />
		</label>

		<label>
			<span className="label-body">SKU</span>
			<Field component="input" type="text" name="sku" />
		</label>

		<label>
			<span className="label-body">Barcode</span>
			<Field component="input" type="text" name="barcode" />
		</label>

		<label>
			<span className="label-body">Supplier</span>
			<Field component="input" type="text" name="supplierId" />
		</label>

		<label>
			<span className="label-body">Lifespan</span>
			<Field
				component={DurationInput} name="lifespan"
				defaultValue={{ years: 1 }}
			/>
		</label>

		<label>
			<span className="label-body">Value</span>
			<Field component={MoneyInput} name="value" />
		</label>

		<label>
			<span className="label-body">Salvage Value</span>
			<Field component={MoneyInput} name="salvageValue" />
		</label>

		<button type="submit" disabled={pristine || submitting}>Submit</button>
	</form>
);

ItemForm.propTypes = propTypes;

export default reduxForm({
	form: 'new-item',
	onSubmit: submitForm,
	onSubmitSuccess(result) {
		console.log(result);
	},
	validate({ value, salvageValue }) {
		const errs = {};
		if (value !== undefined && !validMoney(value)) {
			errs.value = 'Invalid number';
		}
		if (salvageValue !== undefined && !validMoney(value)) {
			errs.salvageValue = 'Invalid number';
		}
		return errs;
	},
})(ItemForm);
