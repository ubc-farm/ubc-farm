import { createElement as h, PropTypes, PureComponent } from 'react';
/** @jsx h */
import DatePicker from 'ubc-farm-datetime-picker/date/picker.js';
import RangeText from './range-text.js';

export default class TimeEditor extends PureComponent {
	static get propTypes() {
		return {
			start: PropTypes.instanceOf(Date.isRequired),
			end: PropTypes.instanceOf(Date),
			onChange: PropTypes.func,
		};
	}

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleStartChange = this.handleChange.bind(this, 'start');
		this.handleEndChange = this.handleChange.bind(this, 'end');

		this.state = { open: 0 };
	}

	handleClick() {
		const { open } = this.state;
		if (open) this.setState({ open: 0 });
		else this.setState({ open: 1 });
	}

	handleChange(prop, e) {
		const output = {
			start: this.props.start,
			end: this.props.end,
		};
		output[prop] = e.target.value;
		this.props.onChange(output);
	}

	render() {
		const { start, end } = this.props;
		const { open } = this.state;

		return (
			<section>
				<h3>Time</h3>
				<RangeText onClick={this.handleClick}	start={start} end={end}	/>

				<DatePicker
					value={start}
					hidden={open !== 1}
					onChange={this.handleStartChange}
				/>
				<DatePicker
					value={end}
					hidden={open !== 2}
					onChange={this.handleEndChange}
				/>
			</section>
		);
	}
}
