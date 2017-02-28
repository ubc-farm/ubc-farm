import { SFC } from 'react';
import { TableProps } from 'react-virtualized';
import * as PouchDB from 'pouchdb';

/**
 * React table component that displays items from a PouchDB database.
 * Use columns to define fields that are shown
 */
const ReactPouchTable: SFC<TableProps & { db: PouchDB.Database<any> }>;

export default ReactPouchTable;
