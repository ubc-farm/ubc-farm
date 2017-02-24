/// <reference path="../../../custom-types/react-reformed/index.d.ts" />

import reformed from 'react-reformed';
import { compose, withProps } from 'recompose';
import { get, set } from 'lodash';

export interface ReformedProps<Model> {
	model: Model;
	setProperty: <Value>(key: string, value: Value) => void;
	setModel: (model: Model) => Model;
	bindInput: <Value>(key: string) => {
		name: string,
		value: Value,
		onChange: React.ChangeEventHandler<any>;
	};
}

interface NestedModelProps {
	model: Object;
	setModel: (model: Object) => Object
}

function setNestedProperty<Value>(
	this: NestedModelProps,
	name: string,
	value: Value,
) {
	const { model, setModel } = this;
	const newModel = set(Object.assign({}, model), name, value);
	return setModel(newModel);
}

function bindNestedInput<Value>(
	this: NestedModelProps,
	name: string,
) {
	return {
		name,
		value: <Value> get(this.model, name),
		onChange: <React.ChangeEventHandler<any>>
			(e => setNestedProperty.call(this, e.target.name, e.target.value)),
	};
}

/**
 * Wrapper around react-reformed that lets bindInput and setProperty
 * work with nested property names, such as `emails[0].href`.
 */
export default compose(
	reformed(),
	withProps(props => ({
		bindInput: bindNestedInput.bind(props),
		setProperty: setNestedProperty.bind(props),
	})),
);
