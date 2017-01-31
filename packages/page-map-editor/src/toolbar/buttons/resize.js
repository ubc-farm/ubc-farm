import { createElement as h } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ToggleButton from './toggle.js';

import { activeSelector, resizableSelector } from '../../redux/selectors.js';
import { toggleResizing } from '../../redux/actions/index.js';

const ResizeButton = props => (
	<ToggleButton id="resize-toggle" {...props}>
		<i className="material-icons">transform</i>
		Resize
	</ToggleButton>
);

const activeIsResizeable = createSelector(
	activeSelector,
	resizableSelector,
	(active, currentResizable) => active === currentResizable
);

export default connect(
	state => ({
		checked: activeIsResizeable(state),
	}),
	dispatch => ({
		onChange() { dispatch(toggleResizing()); },
	})
)(ResizeButton);
