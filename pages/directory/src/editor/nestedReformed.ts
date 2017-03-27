/// <reference path="../../../custom-types/react-reformed/index.d.ts" />

import reformed from 'react-reformed';
import { compose, withProps } from 'recompose';
import { get, set } from 'lodash';

export interface ReformedProps<Model, Key extends keyof Model> {
	model: Model;
	setProperty: (key: Key, value: Model[Key]) => void;
	setModel: (model: Model) => Model;
	bindInput: (key: Key) => {
		name: Key,
		value: Model[Key],
		onChange: React.ChangeEventHandler<any>;
	};
}

interface NestedModelProps<Model> {
	model: Model;
	setModel: (model: Model) => Model
}

function setNestedProperty<Model, Key extends keyof Model>(
	this: NestedModelProps<Model>,
	name: Key,
	value: Model[Key],
) {
	const { model, setModel } = this;
	const newModel = set<Model>(Object.assign({}, model), name, value);
	setModel(newModel);
}

interface NestedInputProps<Model, Key extends keyof Model> {
	name: Key,
	value: Model[Key],
	onChange: React.ChangeEventHandler<any>,
}

function bindNestedInput<Model, Key extends keyof Model>(
	this: NestedModelProps<Model>,
	name: Key,
	defaultValue: Model[Key] = <Model[Key]> '',
): NestedInputProps<Model, Key> {
	return {
		name,
		value: <Model[Key]> get<Model, Model[Key]>(this.model, name) || defaultValue,
		onChange: (e => setNestedProperty.call(this, e.target.name, e.target.value)),
	};
}

function handleSubmit<Model>(
	this: NestedModelProps<Model> & { onSubmit: (model: Model) => void },
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
	withProps((props: { onSubmit?: (model: object) => void }) => ({
		bindInput: <NestedInputProps<any, string>> bindNestedInput.bind(props),
		setProperty: <(name: string, value: any) => void> setNestedProperty.bind(props),
		handleSubmit: props.onSubmit
			? <React.FormEventHandler<HTMLFormElement>> handleSubmit.bind(props)
			: undefined,
	})),
);
