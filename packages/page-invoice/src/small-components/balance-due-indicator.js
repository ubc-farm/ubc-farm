import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { balanceDueSelector } from '../redux/selectors.js';

const Indicator = ({ children }) => (
	<span className="detail-cell">{children}</span>
);

Indicator.propTypes = { children: PropTypes.string };

export default connect(
	state => ({
		children: balanceDueSelector(state).toString(),
	})
)(Indicator);
