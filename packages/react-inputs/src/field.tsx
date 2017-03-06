import { createElement, SFC } from 'react'; /** @jsx createElement */
import { generate } from 'shortid';

interface FieldProps {
	children?: React.ReactType;
	id?: string;
	containerProps?: Object;
	labelProps?: Object;
	[inputProp: string]: any;
}

/**
 * A field that contains an input and corresponding label.
 * An ID will be auto-generated if it isn't specified.
 */
const Field: SFC<FieldProps> = ({
	children,
	id, name,
	containerProps,
	labelProps,
	...rest,
}) => {
	if (!id) {
		id = generate();
		if (name) id = `${name}-${id}`;
	}

	return (
		<div className="field-container" {...containerProps}>
			<label htmlFor={id} {...labelProps}>{children}</label>
			<input id={id} name={name} {...rest} />
		</div>
	);
};

export default Field;
