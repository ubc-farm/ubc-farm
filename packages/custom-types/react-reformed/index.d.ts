// Type definitions for react-reformed v1.0.1
// Project: https://github.com/davezuko/react-reformed
// Definitions by: Tiger Oakes <https://github.com/NotWoods>

import * as React from 'react';

declare module 'react-reformed' {
	export interface ReformedProps<Model, P extends keyof Model> {
		model: Readonly<Model>,
		setProperty: (key: P, value: Model[P]) => void;
		setModel: (model: Model) => Model;
		bindInput: (key: P) => {
			name: P,
			value: Model[P],
			onChange: React.ChangeEventHandler<any>;
		};
	}

	/**
	 * Wraps a React component and injects the form model and setters for that model.
	 * You can optionally pass in a function to the first `reformed` call
	 * that will transform the props that `reformed` applies to the wrapped component.
	 * This is really just for experimentation and to keep the API open for the future.
	 */
	export default function reformed<M>(
		middleware: (props: M) => M
	): (WrappedComponent: React.ReactType) => React.ComponentClass<ReformedProps<M, keyof M>>
}
