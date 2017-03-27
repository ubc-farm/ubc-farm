import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { selected } from '../redux/selectors.js';
import { toggleSelection } from '../redux/actions/index.js';

const Row = ({ checked, onChange, children }) => (
	<tr className={`invoice-row${checked ? ' selected' : ''}`}>
		<td className="align-center">
			<input type="checkbox" checked={checked} onChange={onChange} />
		</td>

		{children}
	</tr>
);
Row.propTypes = {
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	children: PropTypes.node,
};

export default connect(
	(state, { parentIndex }) => ({
		checked: selected(state).has(parentIndex),
	}),
	(dispatch, { parentIndex }) => ({
		onChange() {
			dispatch(toggleSelection(parentIndex));
		},
	})
)(Row);
