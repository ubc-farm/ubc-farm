import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import Money from 'ubc-farm-money';
import { balanceDueIntSelector } from '../redux/selectors.js';

const span = props => createElement('span', props);

export default connect(
	state => {
		const balanceDue = balanceDueIntSelector(state);
		return {
			children: Money.fromInteger(balanceDue).toString(),
		};
	},
	undefined,
	(stateProps) => Object.assign({}, stateProps)
)(span);
