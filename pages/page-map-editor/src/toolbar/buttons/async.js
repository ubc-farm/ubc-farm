import { createElement as h, PureComponent, PropTypes } from 'react';
/** @jsx h */

export default class AsyncActionButton extends PureComponent {
	static get propTypes() {
		return {
			handleClick: PropTypes.func,
			className: PropTypes.string,
			disabled: PropTypes.bool,
			children: PropTypes.node,
		};
	}

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.state = { loading: false };
	}

	handleClick() {
		const { handleClick } = this.props;
		this.setState({ loading: true });

		return Promise.resolve(handleClick())
		.catch(err => {
			console.error(err);
		}).then(() => {
			this.setState({ loading: false });
		});
	}

	render() {
		const { className, children } = this.props;
		const { disabled, loading } = this.state;

		return (
			<button
				onClick={this.handleClick}
				className={className}
				disabled={typeof disabled === 'boolean' ? disabled : loading}
				style={loading ? { cursor: 'wait' } : undefined}
			>
				{children}
			</button>
		);
	}
}
