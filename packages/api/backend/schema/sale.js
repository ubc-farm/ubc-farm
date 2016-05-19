/**
 * @external CreateTableBuilder
 * @see http://knexjs.org/
 */
/**
 * @external SchemaBuilder
 * @see http://knexjs.org/
 */

/**
 * @name sale
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.sale = function(table) {
	table.increments('sale_id').primary();
	table.integer('sale_quantity').defaultTo(1)
	table.specificType('selling_price', 'money');
	table.specificType('sale_date', 'date');
	table.integer('customer').references('person_id').inTable('person');
}

/**
 * @name grant
 * @see sale
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.grant = function(table) {
	table.inherits('sale');
	table.text('grant_name');
}