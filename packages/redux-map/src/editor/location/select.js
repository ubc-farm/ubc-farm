import { createElement as h } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import RelationSelect from 'ubc-farm-inputs/relation.js';
import { locationsList } from '../../redux/selectors.js';
import { setSelectedLocation } from '../../redux/actions/index.js';

const LocationSelect = props => (
	<RelationSelect url="/api/locations" input={props} />
);

export default connect(
	state => ({
		value: locationsList(state),
	}),
	dispatch => ({
		onChange(e) {
			let value;
			if (typeof e !== 'object') value = e;
			else value = e.target.value;

			dispatch(setSelectedLocation(value));
		},
	})
)(LocationSelect);
