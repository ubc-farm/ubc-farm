const Promise = require('bluebird');
let knex = require('knex')({});
let pg = require('knex')({
	client: 'pg',
	connection: process.env.PG_CONNECTION
});