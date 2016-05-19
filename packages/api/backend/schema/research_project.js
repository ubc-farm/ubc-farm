/**
 * @external CreateTableBuilder
 * @see http://knexjs.org/
 */
/**
 * @external SchemaBuilder
 * @see http://knexjs.org/
 */

/**
 * @name research_project
 * @version 1
 * @param {external:CreateTableBuilder} table
 * @returns {external:SchemaBuilder}
 */
exports.research_project = function(table) {
	table.increments('project_id').primary();
	table.integer('researcher').unique().index()
	table.text('project_title')
	table.specificType('project_date', 'daterange')
	table.specificType('project_copis', 'integer[]')
	table.specificType('project_hqp', 'integer[]')
}