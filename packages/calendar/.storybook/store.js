import { createStore, combineReducers } from 'redux';
import calendar from '../src/redux/reducer.js';

export default createStore(combineReducers({ calendar }));
