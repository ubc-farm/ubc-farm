import { createElement as h, Component, PropTypes } from 'react'; /** @jsx h */
import { connect } from 'react-redux';

import { generateSortMap } from 'ubc-farm-table-base';
import { dataSelector } from '../redux/selectors.js';

import Head from './head.js';
import Body from './body.js';
import TotalFooter from './footer.js';
import ActionBar from './toolbar.js';
import { AddRow, DeleteSelected } from './toolbar-buttons.js';

class InvoiceTable extends Component {
	static get propTypes() {
		return {
			data: PropTypes.instanceOf(Map),
		};
	}

	constructor(props) {
		super(props);
		this.handleColumnClick = this.handleColumnClick.bind(this);

		this.state = {
			sort: { column: undefined, descending: true },
		};
	}

	generateSortMap() {
		const { column, descending } = this.state.sort;
		if (!column) return undefined;

		return generateSortMap(this.props.data, column, descending);
	}

	/** Changes table sorting when the user clicks on a column */
	handleColumnClick(column) {
		const { column: sortColumn, descending } = this.state.sort;
		if (sortColumn === column) {
			this.setState({ sort: { column, descending: !descending } });
		} else {
			this.setState({ sort: { column, descending: true } });
		}
	}

	render() {
		const { sort } = this.state;

		return (
			<table className="invoice-table">
				<ActionBar>
					<AddRow />
					<DeleteSelected />
				</ActionBar>
				<Head sorting={sort} onColumnClick={this.handleColumnClick} />
				<Body sortMap={this.generateSortMap()} />
				<TotalFooter />
			</table>
		);
	}
}

export default connect(
	state => ({
		data: dataSelector(state),
	}),
	undefined,
	undefined,
	{ pure: false }
)(InvoiceTable);
