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
	setModel(newModel);
}

interface NestedInputProps<Value> {
	name: string,
	value: Value,
	onChange: React.ChangeEventHandler<any>,
}

function bindNestedInput<Value>(
	this: NestedModelProps,
	name: string,
): NestedInputProps<Value> {
	return {
		name,
		value: <Value> get(this.model, name) || '',
		onChange: (e => setNestedProperty.call(this, e.target.name, e.target.value)),
	};
}

function handleSubmit(
	this: NestedModelProps & { onSubmit: (model: Object) => void },
	e: React.FormEvent<HTMLFormElement>,
) {
	e.preventDefault();
	this.onSubmit(this.model);
}

/**
 * Wrapper around react-reformed that lets bindInput and setProperty
 * work with nested property names, such as `emails[0].href`.
 */
export default compose(
	reformed(),
	withProps((props: { onSubmit?: (model: Object) => void }) => ({
		bindInput: <NestedInputProps<any>> bindNestedInput.bind(props),
		setProperty: <(name: string, value: any) => void> setNestedProperty.bind(props),
		handleSubmit: props.onSubmit
			? <React.FormEventHandler<HTMLFormElement>> handleSubmit.bind(props)
			: undefined,
	})),
);
