/**
 * @external CreateTableBuilder
 * @see http://knexjs.org/
 */
/**
 * @external SchemaBuilder
 * @see http://knexjs.org/
 */

/**
 * @name plant
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.plant = function(table) {
	table.increments('plant_id').primary();
	table.text('plant_name').index().notNullable();
	table.text('plant_latin').index();
	table.integer('plant_value').references('inventory_id').inTable('inventory')
}

/**
 * @name inventory
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.inventory = function(table) {
	table.increments('inventory_id').primary();
	table.text('inventory_name').index();
	table.integer('supplier').references('person_id').inTable('person').index()
	table.string('product_code').index();
	table.text('inventory_notes');
	table.boolean('item_consumable').index();
	table.specificType('inventory_value', 'money');
	table.specificType('depreciation_rate', 'money');
}

/**
 * @name location
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.inventory = function(table) {
	table.increments('location_id').primary();
	table.text('location_name');
	table.specificType('location_position', 'point');
}

/**
 * Represents UBC Farm programs
 * @name program
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.program = function(table) {
	table.increments('program_id').primary();
	table.string('program_name').index();
	table.specificType('program_color', 'smallint[]');
}

/**
 * @name chemical
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.chemical = function(table) {
	table.increments('chem_id').primary();
	table.string('chem_type').index();
	table.text('chem_product');
	table.text('chem_composition');
}