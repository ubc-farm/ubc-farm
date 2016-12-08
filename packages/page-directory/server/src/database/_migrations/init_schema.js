exports.up = knex => knex.schema
	.createTable('people', (table) => {
		table.integer('id').increments();
		table.string('role').index();
		table.string('email').unique();
		table.string('phoneNumber');
		table.json('addressMailing');
		table.json('addressPhysical');
	})
	.createTable('employees', (table) => {
		table.integer('id').references('people.id').primary();
		table.integer('pay');
		table.enum('employmentType', ['fullTime', 'partTime']).index();
		table.json('holidayDays');
		table.json('sickDays');
		table.json('paidLeaveDays');
		table.json('inLieuHours');
		table.json('medicalLeaveTime');
		table.integer('emergencyContact').references('people.id');
		table.json('workingDays');
	})
	.createTable('researchers', (table) => {
		table.integer('id').references('people.id').primary();
		table.string('position');
		table.string('faculty');
		table.string('department');
		table.string('labWebsite');
		table.text('expertise');
		table.json('coursesTaught');
		table.text('projects');
	});

exports.down = knex => knex.schema
	.dropTable('people')
	.dropTable('employees')
	.dropTable('researchers');
