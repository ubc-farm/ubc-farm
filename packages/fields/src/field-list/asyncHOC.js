import { Component, createElement } from 'react';

/**
 * A simple higher order component for React,
 * which gets data from a promise when the component mounts
 * and then adds it to a prop once the promise has resolved.
 * @param {function} promiseFunc - called without any arguments. The returned
 * promise is awaited and the resolved data is set on the `data` prop.
 * @param {string} [dataProp=data]
 * @param {string} [loadingProp=loading]
 * @param {string} [errorProp=error]
 */
export default function asyncHOC(promiseFunc, {
	dataProp = 'data',
	loadingProp = 'loading',
	errorProp = 'error',
	dataDefault = {},
} = {}) {
	let isCancelled = false;
	return WrappedComponent => class AsyncHOC extends Component {
		constructor(props) {
			super(props);
			this.state = { [dataProp]: dataDefault, [loadingProp]: true, [errorProp]: null };
		}

		componentDidMount() {
			let error = null;
			return Promise.resolve(promiseFunc())
				.catch((err) => { error = err; })
				.then((data) => {
					if (isCancelled) throw new Error('Cancelled due to unmount');

					const newState = { [loadingProp]: false };
					if (error) newState[errorProp] = error;
					else newState[dataProp] = data;

					this.setState(newState);
				});
		}

		componentWillUnmount() { isCancelled = true; }

		render() {
			return createElement(
				WrappedComponent,
				Object.assign({}, this.props, this.state),
				null
			);
		}
	}
}
