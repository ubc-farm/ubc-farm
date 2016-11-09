import { createElement, PropTypes, PureComponent } from 'react';
/** @jsx createElement */

export default class Insert extends PureComponent {
	render() {
		return (
			<dialog
				className="farmtable-Insert"
				hidden={!this.props.open}
			>
				<form className="farmtable-Insert-form" onSubmit={this.props.onSubmit}>
					{ this.props.children }
					<button type="submit">Submit</button>
				</form>
			</dialog>
		);
	}
}

Insert.propTypes = {
	open: PropTypes.bool,
	children: PropTypes.node,
	onSubmit: PropTypes.func,
};
