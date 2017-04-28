# @ubc-farm/database-utils
Some functions to use with the `@ubc-farm/database` package.
The full API of each function can be seen in its `index.d.ts` file, with
some summaries listed below:

## connectAll
connectAll is a React higher-order component used to give
read-only access to a database to a React component.
Each row from the database
is set to the component under the 'rows' prop, or whatever custom rowKey
is specified in the options. If options.useMap is set to true, 'rows' will
be a Map where the document ID is the key and the transformed document is
the value. Otherwise, a plain object is used with the same keys and values.
The component must have the 'db' prop and contain some database.
By default, include_docs is set to true.
The database connection is read only. To edit items in the database, it must
be done externally. Changes to the database are automatically reflected in
the component.

## configureStore
Builds a redux store that contains rows from a PouchDB database.
Rows are loaded into the `data` property of the state.

## createList
Table element to display items from a PouchDB database.
