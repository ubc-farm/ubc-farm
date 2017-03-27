import { createElement as h } from 'react';
/** @jsx h */
import { connect } from 'react-redux';

import { activeSelector } from '../../redux/selectors.js';
import savePolygon from '../../map/actions/publish.js';

import AsyncButton from './async.js';

const PublishButton = props => (
	<AsyncButton {...props}>
		<i className="material-icons">publish</i>
		Publish
	</AsyncButton>
);

export default connect(
	state => {
		const active = activeSelector(state);

		return {
			disabled: active === '' ? true : undefined,
			handleClick: savePolygon.bind(undefined, active),
		};
	},
	undefined,
	undefined,
	{ pure: false }
)(PublishButton);
