# @ubc-farm/react-inputs

Various inputs for use inside forms. The API is similar to normal `<input />`
elements, with `value`, `onChange`, and `defaultValue` props.

## Field
A container for inputs that includes a corresponding label. Will auto-generate
an ID for the input if no id is specified.

## DateInput
A wrapper for `<input type="date" />` that uses `moment` to represent
the value instead of a string.

## DateTimeInput
A wrapper for `<input type="datetime-local" />` that uses `moment` to represent
the value instead of a string.

## MoneyInput
An input that translates money values typed by the user into a cents
integer value.
