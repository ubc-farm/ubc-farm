import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { selectedLength } from '../redux/selectors.js';

const Switch = ({ unselectedElement, selectedElement, showSelected }) => {
	const className = 'table-actions table-actions-standard';
	let unselected;
	let selected;
	if (showSelected) {
		selected = `${className} visible`;
		unselected = `${className} hidden`;
	} else {
		unselected = `${className} visible`;
		selected = `${className} hidden`;
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
