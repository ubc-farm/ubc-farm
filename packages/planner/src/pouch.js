import PouchDB from 'pouchdb';

export const taskTypes = new PouchDB('taskTypes');
export const tasks = new PouchDB('tasks');
export const locations = new PouchDB('locations');
