import {createElement} from 'react' /** @jsx createElement */
import { Field, reduxForm } from 'redux-form';

const ItemForm = ({handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<label>
			<span className='label-body'>Name</span>
			<Field component='input' type='text' name='name' />
		</label>

		<label>
			<span className='label-body'>SKU</span>
			<Field component='input' type='text' name='sku' />
		</label>

		<label>
			<span className='label-body'>Barcode</span>
			<Field component='input' type='text' name='barcode' />
		</label>

		<label>
			<span className='label-body'>Supplier</span>
			<Field component='input' type='text' name='supplierId' />
		</label>

		<label>
			<span className='label-body'>Lifespan</span>
			<Field component='input' type='text' name='lifespan' />
		</label>

		<label>
			<span className='label-body'>Value</span>
			<Field component='input' type='text' name='value' />
		</label>

		<label>
			<span className='label-body'>salvageValue</span>
			<Field component='input' type='text' name='value' />
		</label>
	</form>
)