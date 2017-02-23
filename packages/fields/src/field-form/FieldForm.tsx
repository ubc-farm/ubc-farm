import { createElement, PropTypes, Component } from 'react'; /** @jsx createElement */
import { getLocationString, getArea, Field } from '@ubc-farm/databases';

interface FieldFormProps {
	model: Field;
	setProperty: (key: string, value: any) => void;
	onSubmit: () => void;
}

/**
 * A form that allows the user to set the field object's name.
 * Additionally, the location and area can be manually set. If they are not
 * manually set (or are cleared by the user), then they will be automatically
 * calculated by the polygon corresponding to the field.
 */
class FieldForm extends Component<FieldFormProps, void> {
	bindInput(name) {
		switch (name) {
			case 'location':
				return {
					name,
					value: getLocationString(this.props.model),
					onChange: e => this.props.setProperty(name, e.target.value),
				};
			case 'area':
				return {
					name,
					value: getArea(this.props.model) || '',
					onChange: e => this.props.setProperty(name, e.target.value),
				};
			default:
				return {
					name,
					value: this.props.model[name],
					onChange: e => this.props.setProperty(name, e.target.value),
				};
		}
	}

	render() {
		return (
			<form
				className="form"
				onSubmit={(e) => {
					e.preventDefault();
					this.props.onSubmit();
				}}
			>
				<label className="form-label" htmlFor="form-name">Field Name</label>
				<div className="form-input">
					<input type="text" id="form-name" required {...this.bindInput('name')} />
				</div>

				<label className="form-label" htmlFor="form-location">Location</label>
				<div className="form-input">
					<input type="text" id="form-location" {...this.bindInput('location')} />
				</div>

				<label className="form-label" htmlFor="form-area">Area</label>
				<div className="form-input">
					<input min={0} type="number" id="form-area" {...this.bindInput('area')} />
					<label htmlFor="form-location">ac</label>
				</div>
			</form>
		);
	}
}

FieldForm.propTypes = {
	model: PropTypes.shape({
		name: PropTypes.string.isRequired,
		geometry: PropTypes.shape({
			type: PropTypes.oneOf(['Polygon']),
			coordinates: PropTypes.arrayOf(
				PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
			),
		}),
		location: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
		area: PropTypes.number,
	}).isRequired,
	setProperty: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default FieldForm;
