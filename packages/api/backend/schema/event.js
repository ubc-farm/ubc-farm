/**
 * @external CreateTableBuilder
 * @see http://knexjs.org/
 */
/**
 * @external SchemaBuilder
 * @see http://knexjs.org/
 */

/**
 * @name event
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.sale = function(table) {
	table.increments('event_id').primary();
	table.text('event_name').index()
	table.string('event_type')
	table.integer('attendee_number')
	table.specificType('age_group', 'int4range')
	table.specificType('event_time', 'tsrange').index()
	//table.specificType('keywords', 'tsvector').index()
	table.integer('event_location').references('location.location_id')
	table.integer('event_program').references('program.program_id')
	table.integer('ticket').references('sale_id').inTable('sale');
}