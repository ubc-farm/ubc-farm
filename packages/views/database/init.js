import Knex from 'knex';
import {Model} from 'objection';
import * as knexfile from '../knexfile.js';

const {NODE_ENV = 'development'} = process.env;

const knex = Knex(knexfile[NODE_ENV]);
Model.knex(knex);