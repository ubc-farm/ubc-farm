import reactReformed from 'react-reformed';
import { get, set } from 'lodash';

function transformReformedProps(props) {
	const { model, setModel } = props;

	function setProperty(name, value) {
		setModel(set(Object.assign({}, model), name, value));
	}

	function bindInput(name, defaultValue = '') {
		return {
			name,
			value: get(model, name) || defaultValue,
			onChange(e) { setProperty(e.target.name, e.target.value); },
		};
	}

	return Object.assign({}, props, {
		bindInput,
		setProperty,
	});
}

export default function reformed() {
	return WrappedComponent => reactReformed(transformReformedProps)(WrappedComponent);
}
