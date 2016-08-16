import {createElement as h, PureComponent} from 'react'; /** @jsx h */
import Picker from './picker.js';

export default class PickerContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {value: new Date()};
	}

	handleChange(newValue) {
		this.setState({value: newValue});
	}

	render() {
		return (
			<Picker {...this.props} 
				value={this.state.value} 
				onChange={this.handleChange}
			/>
		);
	}
}