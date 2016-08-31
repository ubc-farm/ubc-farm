import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { selectedLength } from '../redux/selectors.js';

const Switch = ({ unselectedElement, selectedElement, showSelected }) => {
	let unselected = 'table-actions table-actions-standard';
	let selected = 'table-actions table-actions-selected';
	if (showSelected) {
		selected = `${selected} visible`;
		unselected = `${unselected} hidden`;
	} else {
		unselected = `${unselected} visible`;
		selected = `${selected} hidden`;
	}

	return (
		<caption className="table-actions-container">
			<section className={unselected}>{unselectedElement}</section>
			<section className={selected}>{selectedElement}</section>
		</caption>
	);
};

Switch.propTypes = {
	unselectedElement: PropTypes.node,
	selectedElement: PropTypes.node,
	showSelected: PropTypes.bool.isRequired,
};

export default connect(
	state => ({ showSelected: selectedLength(state) > 0 })
)(Switch);
