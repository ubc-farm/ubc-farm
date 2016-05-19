const Promise = require('bluebird');
const knex = require('knex')({});

/**
 * @external CreateTableBuilder
 * @see http://knexjs.org/
 */
/**
 * @external SchemaBuilder
 * @see http://knexjs.org/
 */

/**
 * @name person
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.person = function(table) {
	table.increments('person_id').primary();
	table.text('person_name').index().notNullable();
	table.string('person_role', 64);
	table.text('person_email');
	table.string('person_phone', 15);
	table.text('person_mail_address');
	table.text('person_physical_address');
	//table.varchar('user_id').references('user.user_id').unique();
}

/**
 * @name employee
 * @see person
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.employee = function(table) {
	table.inherits('person');
	table.boolean('full_or_part').index();
	table.specificType('days_avaliable', 'boolean[7]').index();
	table.specificType('hourly_pay', 'money');
	
	//possiblity reconfigure to use child tables
	table.specificType('holiday_days', 'date[]');
	table.specificType('sick_days', 'date[]');
	table.specificType('paid_leave_days', 'date[]');
	table.specificType('in_lieu_hours', 'interval');
	table.specificType('medical_app_hours', 'tsrange[]');
}

/**
 * @name researcher
 * @see person
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.researcher = function(table) {
	table.inherits('person');
	table.text('researcher_position');
	table.text('researcher_faculty');
	table.text('researcher_department');
	table.text('lab_website');
	table.text('researcher_expertise');
	table.specificType('researcher_courses', 'text[]');
	table.text('researcher_affiliation');
	table.text('researcher_publications');
	table.text('researcher_partners');
}

/**
 * Many-to-many join helper table
 * @name assignment
 * @see employee
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.assignment = function(table) {
	table.increments('assignment_id').primary();
	table.integer('assigned_employee')
		.references('person_id').inTable('employee')
		.notNullable();
		
	table.integer('assigned_event')
		.references('event_id').inTable('event');
	table.integer('assigned_task')
		.references('task_id').inTable('task');
		
	table.specificType('assignment_time', 'tsrange');
	table.integer('assignment_location')
		.references('location_id').inTable('location');
}