import { createElement as h, PropTypes } from 'react';
/** @jsx h */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { activeSelector } from '../../redux/selectors.js';

import { data as mapData } from '../../map/map.js';
import { isUnsaved } from '../../map/utils/index.js';
import deletePolygon from '../../map/actions/delete.js';

import AsyncButton from './async.js';

const DeleteButton = props => (
	<AsyncButton {...props}>
		<i className="material-icons">
			{props.forever ? 'delete_forever' : 'delete'}
		</i>
		Delete
	</AsyncButton>
);

DeleteButton.propTypes = {
	forever: PropTypes.bool,
};

const computeProps = createSelector(
	activeSelector,
	active => {
		if (active === '') return { disabled: true };
		const feature = mapData.getFeatureById(active);

		return {
			forever: !isUnsaved(feature),
			handleClick: deletePolygon.bind(undefined, feature),
		};
	}
);

export default connect(
	state => computeProps(state),
	undefined,
	undefined,
	{ pure: false }
)(DeleteButton);
