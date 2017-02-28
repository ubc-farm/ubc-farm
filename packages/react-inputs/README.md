# @ubc-farm/react-inputs

Various inputs for use inside forms. The API is similar to normal `<input />`
elements, with `value`, `onChange`, and `defaultValue` props.

## DateInput
A wrapper for `<input type="date" />` that uses `moment` to represent
the value instead of a string.

## DateTimeInput
A wrapper for `<input type="datetime-local" />` that uses `moment` to represent
the value instead of a string.

## RelationSelect
A [VirtualizedSelect](https://github.com/bvaughn/react-virtualized-select)
that loads possible values from a `PouchDB` database. Most props are the same
as VirtualizedSelect, but you must also pass a `PouchDB` instance through the
`db` prop.

