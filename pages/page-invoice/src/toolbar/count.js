import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { selectedLength } from '../redux/selectors.js';

function SelectedCounter({ value }) {
	const s = value > 1 ? 's' : '';
	const text = `${value} item${s} selected`;

	return <span className="selected-count">{text}</span>;
}

SelectedCounter.propTypes = { value: PropTypes.number.isRequired };

export default connect(
	state => ({ value: selectedLength(state) })
)(SelectedCounter);
