/**
 * @external CreateTableBuilder
 * @see http://knexjs.org/
 */
/**
 * @external SchemaBuilder
 * @see http://knexjs.org/
 */

/**
 * @name field
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.field = function(table) {
	table.increments('field_id').primary();
	table.integer('parent_field').references('field_id').inTable('field')
	table.specificType('field_area', 'path').index(, 'GiST');
	table.boolean('as_tile_values').defaultTo(false)
	table.decimal('grid_widths', 9, 3);
	table.decimal('grid_heights', 9, 3);
}

/**
 * @name crop
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.crop = function(table) {
	table.increments('crop_id').primary();
	table.integer('crop_type').references('plant.plant_id').notNullable().index()
	table.integer('crop_field').references('field.field_id').notNullable().index()
	table.integer('crop_quantity')
	table.text('predicted_nutrient_req')
}