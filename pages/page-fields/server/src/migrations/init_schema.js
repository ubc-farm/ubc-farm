exports.up = knex => knex.schema
	.createTable('fields', (table) => {
		table.string('id').increments();
		table.string('name');
		table.json('path');
		table.json('crops').notNullable();
		table.string('area')
			.notNullable()
			.references('area.name');
	})
	.createTable('area', (table) => {
		table.string('name').primary();
		table.json('geometry').notNullable();
	});

exports.down = knex => knex.schema
	.dropTable('fields')
	.dropTable('area');
