/**
 * @external CreateTableBuilder
 * @see http://knexjs.org/
 */
/**
 * @external SchemaBuilder
 * @see http://knexjs.org/
 */

/**
 * @name equipment
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.equipment = function(table) {
	table.increments('equipment_id').primary();
	table.specificType('purchase_date', 'date');
	
	table.integer('product_data')
		.references('invetory_id').inTable('inventory')
	table.integer('quantity');
	
	table.integer('equipment_location').index()
		.references('location_id').inTable('location')
		
	table.text('equipment_notes')
}

/**
 * Many-to-many join helper table
 * @name equipment_usage
 * @see equipment
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.equipment_usage = function(table) {
	table.increments('usage_id').primary();
	table.integer('equipment_info')
		.references('equipment_id').inTable('equipment').notNullable();
	table.integer('quantity_used')
	table.specificType('usage_time', 'tsrange');
	table.integer('selling_usage').references('sale_id').inTable('sale')
	table.text('usage_note')
}