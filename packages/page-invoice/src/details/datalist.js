import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { datalistID, datalistValues } from '../redux/selectors.js';

const DataList = ({ id, options }) => (
	<datalist id={id}>
		{options.map(value => <option value={value} key={value} />)}
	</datalist>
);

DataList.propTypes = {
	id: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string),
};

export default connect(
	state => ({
		id: datalistID(state),
		options: datalistValues(state),
	})
)(DataList);
