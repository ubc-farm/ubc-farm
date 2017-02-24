import { createElement, PropTypes, Component, ChangeEvent } from 'react';
/** @jsx createElement */
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
	static propTypes: Object;

	bindInput(name: string) {
		const onChange = (e: ChangeEvent<any>) =>
			this.props.setProperty(name, e.target.value);

		switch (name) {
			case 'location':
				return { name, onChange, value: getLocationString(this.props.model) };
			case 'area':
				return { name, onChange, value: getArea(this.props.model) || '' };
			default:
				return { name, onChange, value: this.props.model[name] };
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
