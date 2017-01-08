import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import reformed from 'react-reformed';
import { compose } from 'recompose';
import { get, set } from 'lodash';

function setNestedProperty({ model, setModel }, name, value) {
	const newModel = set(Object.assign({}, model), target.name, target.value);
	return setModel(newModel);
}

function bindNestedInput(props, name) {
	const { model, setModel } = props;
	return {
		name,
		value: get(model, name),
		onChange: e => setNestedProperty(props, e.target.name, e.target.value),
	};
}

/**
 * Wrapper around react-reformed that lets bindInput and setProperty
 * work with nested property names, such as `emails[0].href`.
 */
export default compose(
	reformed(),
	withProps(props => ({
		bindInput: bindNestedInput.bind(null, props),
		setProperty: setNestedProperty.bind(null, props),
	})),
);
