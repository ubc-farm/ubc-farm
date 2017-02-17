# @ubc-farm/databases

Contains definitions for PouchDB databases used throughout the ubc-farm modules.
Each root file in `src/` is a seperate database.

The exports from each database file follow this format:
- **default**: A promise that resolves with the database when it is ready.
- **db**: The database itself, not nessecarily ready to use.
- *Other exports*: Utility functions for working with documents in the database.

## connectAll
connectAll is a React higher-order component used to give
read-only access to a database to a React component.
