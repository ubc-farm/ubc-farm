exports.up = knex => knex.schema
	.withSchema('fields')
	.createTable('fields', (table) => {
		table.string('id').primary();
		table.string('name');
		table.json('path');
		table.json('crops').notNullable();
		table.string('location')
			.notNullable()
			.references('locations.name');
	})
	.createTable('locations', (table) => {
		table.string('name').primary();
		table.json('geometry').notNullable();
	});

exports.down = knex => knex.schema
	.withSchema('fields')
	.dropTable('fields')
	.dropTable('locations');
