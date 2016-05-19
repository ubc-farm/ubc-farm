/**
 * @external CreateTableBuilder
 * @see http://knexjs.org/
 */
/**
 * @external SchemaBuilder
 * @see http://knexjs.org/
 */

/**
 * @name task
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.task = function(table) {
	table.increments('task_id').primary();
	table.specificType('task_time', 'tsrange').index();
	table.specificType('task_worked_time', 'interval');
	table.integer('task_location').references('location_id').inTable('location');
}

/**
 * @name seeding
 * @see task
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.seeding = function(table) {
	table.inherits('task');
	table.integer('crop').references('crop_id').inTable('crop')
	table.string('seed_method').index()
	table.specificType('seed_hole_spacing', 'point')
	table.decimal('seed_hole_depth', 9, 3);
}

/**
 * @name irrigation
 * @see task
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.irrigation = function(table) {
	table.inherits('task');
	table.string('irrigation_type').index()
	table.decimal('flow_rate', 9, 3);
}

/**
 * @name fertilizing
 * @see task
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.fertilizing = function(table) {
	table.inherits('task');
	table.integer('chemical').references('chem_id').inTable('chemical').index()
	table.decimal('fertilizer_quantity', 9, 3);
	table.specificType('water_mix_ratio', 'point');
}

/**
 * @name pest_control
 * @see task
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.pest_control = function(table) {
	table.inherits('task');
	table.integer('chemical').references('chem_id').inTable('chemical').index()
	table.decimal('application_rate', 9, 3);
	table.specificType('interval_entry', 'interval');
	table.specificType('interval_harvest', 'interval');
	table.specificType('water_mix_ratio', 'point');
}