const {resolve} = require('path');
console.log(resolve(__dirname, './database/dev.sqlite3'));

module.exports = {

	development: {
		client: 'sqlite3',
		connection: {
			filename: resolve(__dirname, './database/dev.sqlite3')
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: resolve(__dirname, './database/_migrations')
		},
		seeds: {
			directory: resolve(__dirname, './database/_seeds')
		},
		useNullAsDefault: true
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user:     'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user:     'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}

};
