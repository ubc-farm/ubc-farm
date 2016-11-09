import { createElement, PropTypes, Component } from 'react';
import { map, bindAll } from 'lodash-es';
import InsertBase from '../present/Insert.jsx';
import Input from '../present/Input.jsx';
/** @jsx createElement */

export default class Insert extends Component {
	constructor(props) {
		super(props);

		bindAll(this, 'handleSubmit', 'handleChange');
		this.state = {};
	}

	handleChange(e, name) {
		this.setState({ [name]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		return (
			<InsertBase
				open={this.props.open}
				onSumbit={this.handleSubmit}
			>
				{ map([...this.props.columnInfo], ([name, data]) => {
					if (data.hiddenOnInsert) return null;

					return (
						<Input
							autoFocus={data.index === 0}
							name={name} key={name}
							id={`tablebase-Insert/-${name}`}
							type="text"
							value={this.state[name] || ''}
							onChange={this.handleChange}
						>
							{ data.text }
						</Input>
					);
				}) }
			</InsertBase>
		);
	}
}

Insert.propTypes = {
	open: PropTypes.bool,
	columnInfo: PropTypes.instanceOf(Map).isRequired,
	onSubmit: PropTypes.func.isRequired,
};
