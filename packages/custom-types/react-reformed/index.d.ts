// Type definitions for react-reformed v1.0.1
// Project: https://github.com/davezuko/react-reformed
// Definitions by: Tiger Oakes <https://github.com/NotWoods>

import * as React from 'react';

declare module 'react-reformed' {
	export interface ReformedProps<V> {
		setProperty: (key: string, value: V) => void;
		setModel: (model: Object) => Object;
		bindInput: (key: string) => {
			name: string,
			value: V,
			onChange: React.ChangeEventHandler<any>;
		};
	}

	/**
	 * Wraps a React component and injects the form model and setters for that model.
	 * You can optionally pass in a function to the first `reformed` call
	 * that will transform the props that `reformed` applies to the wrapped component.
	 * This is really just for experimentation and to keep the API open for the future.
	 */
	export default function reformed<V>(
		middleware: (props: Object) => Object
	): (WrappedComponent: React.ReactType) => React.ComponentClass<ReformedProps<V>>
}
