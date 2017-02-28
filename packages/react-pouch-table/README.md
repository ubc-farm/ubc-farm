# @ubc-farm/react-pouch-table

React table component that displays items from a PouchDB database.
Use [Columns](https://github.com/bvaughn/react-virtualized/blob/master/docs/Column.md) to define fields that are shown.

Pass a PouchDB database through the `db` prop to the database, and rows will be
loaded from it.

Many props are the same as [Table](https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md)
from `react-virtualized`.
`rowCount`, `rowGetter`, `height`, and `width` are set by this
component.
