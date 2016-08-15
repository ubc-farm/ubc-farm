/**
 * These functions are used for migrating the database and are called by 
 * knex migrate. The up function is called when applying the migration, and the
 * down function should be called to 'undo' the up migration.
 * 
 * The model classes will reference these tables, but will be better documented.
 * 
 * This initial file will do first-time setup, but future files will modify the
 * schema established here.
 * @module backend/database/migrations
 */

exports.up = function(knex) {
	// Person and sub-types
	return knex.schema
	.createTable('Person', table => {
		table.bigIncrements('id');
		table.text('name').index().notNullable();
		table.string('role');

		table.text('email');
		table.string('phoneNumber', 15);
		table.json('addressMailing');
		table.json('addressPhysical');
	})
	.createTable('Employee', table => {
		table.inherits('Person');
		//////////////////////////////////////
		table.bigIncrements('id');
		table.text('name').index().notNullable();
		table.string('role');

		table.text('email');
		table.string('phoneNumber', 15);
		table.json('addressMailing');
		table.json('addressPhysical');
		/////////////////////////////////////

		table.integer('hourlyPay');
		table.boolean('fullOrPartTime').index();

		//possiblity reconfigure to use child tables
		table.specificType('holidayDays', 'date[]');
		table.specificType('sickDays', 'date[]');
		table.specificType('paidLeaveDays', 'date[]');
		table.specificType('inLieuHours', 'interval');
		table.specificType('medicalLeaveTime', 'tsrange[]');

		table.boolean('working_sunday').index();
		table.boolean('working_monday').index();
		table.boolean('working_tuesday').index();
		table.boolean('working_wednesday').index();
		table.boolean('working_thursday').index();
		table.boolean('working_friday').index();
		table.boolean('working_saturday').index();

		table.text('emergencyContactName');
		table.string('emergencyContactNumber', 15);
	})
	.createTable('Researcher', table => {
		table.inherits('Person');
		//////////////////////////////////////
		table.bigIncrements('id');
		table.text('name').index().notNullable();
		table.string('role');

		table.text('email');
		table.string('phoneNumber', 15);
		table.json('addressMailing');
		table.json('addressPhysical');
		/////////////////////////////////////

		table.text('position');
		table.text('faculty');
		table.text('department');
		table.text('labWebsite');
		table.text('expertise');
		table.text('coursesTaught');
		table.text('projects');
	})
	.createTable('Assignment', table => {
		table.bigIncrements('id');

		table.bigInteger('assigned_task').unsigned()
			.references('id').inTable('Task');

		table.bigInteger('assigned_employee')
			.unsigned().notNullable()
			.references('id').inTable('Employee');
	})
	// Equipment and Usage
	.createTable('Equipment', table => {
		table.bigIncrements('id');
		table.bigInteger('product')
			.unsigned().index()
			.references('id').inTable('Item');
		
		table.text('description');
		table.integer('quantity');
		table.date('purchaseDate');
		
		table.bigInteger('location').index()
			.references('id').inTable('Location');
	})
	.createTable('EquipmentUsage', table => {
		table.bigIncrements('id');

		table.bigInteger('equipment')
			.unsigned().notNullable()
			.references('id').inTable('Equipment');
		table.integer('quantity');

		table.bigInteger('sellingUsage').unsigned()
			.references('id').inTable('Sale');
		table.bigInteger('taskUsage').unsigned()
			.references('id').inTable('Task');
		table.text('notes')
	})
	// Event
	.createTable('Event', table => {
		table.inherits('Task');
		table.string('type').index();
		table.text('name').index();

		//table.specificType('keywords', 'tsvector').index()
		table.integer('estimatedAttendeeAmount');
		table.specificType('targetAgeGroup', 'int4range')
		
		table.bigInteger('ticketId').unsigned()
			.references('id').inTable('Sale');
		table.bigInteger('contactId').unsigned()
			.references('id').inTable('Person');
	})
	// Tasks
	.createTable('Task', table => {
		table.bigIncrements('id');

		table.timestamp('start_time');
		table.timestamp('end_time');
		table.specificType('hoursTaken', 'interval');

		table.bigInteger('locationId').unsigned()
			.references('id').inTable('Location');
	})
	.createTable('Seeding', table => {
		table.inherits('Task');
		table.bigInteger('crop').unsigned()
			.references('id').inTable('Crop');
		
		table.bigInteger('variety').unsigned()
			.references('id').inTable('Plant');
		table.bigInteger('product').unsigned()
			.references('id').inTable('Item');
		
		table.string('methodUsed').index();
		
		table.json('spacingBetweenHoles');
		table.float('depthOfHoles');
		table.float('seedsPerHole');

		table.float('gramsApplied');
		table.float('seedsPerGram');

		table.float('germinationPercentage');

		table.float('predictedYield');
		table.specificType('daysToMaturity', 'interval');

		table.json('npkReq');
	})
	.createTable('Irrigation', table => {
		table.inherits('Task');

		table.float('flowRate');
		table.string('type').index();
	})
	.createTable('ChemicalTask', table => {
		table.inherits('Task');
		
		table.bigInteger('product')
			.unsigned().index()
			.references('id').inTable('Chemical');

		table.string('type');
		table.float('applicationRate');
		table.float('waterToMixRatio');
		table.string('plantLocation');
		table.specificType('entry_interval', 'interval');
		table.specificType('harvest_interval', 'interval');
	})
	.createTable('Fertilizing', table => {
		table.inherits('ChemicalTask');

		table.float('tc');
		table.float('n03');
		table.float('nh4');
		table.float('k20');
		table.float('p205');
	})
	.createTable('PestControl', table => {
		table.inherits('ChemicalTask');		

		table.json('activeIngredients');
		table.float('percentOfActiveIngredients');
	})
	.createTable('Scouting', table => {
		table.inherits('Task');
		table.bigInteger('cropId').unsigned()
			.references('id').inTable('Crop');
	})
	.createTable('ScoutHarvest', table => {
		table.inherits('Scouting');
		table.date('newExpectedHarvest');
		table.float('newPredictedYield');
	})
	.createTable('ScoutPest', table => {
		table.inherits('Scouting');
		
		table.string('pestType');
		table.string('affectedSpot');
		
		table.text('pestName');
		table.text('pestNameLatin');

		table.float('percentAreaAffected');
		table.float('percentPlantsAffected');
		table.float('economicThreshold');
	})
	.createTable('SoilSampling', table => {
		table.inherits('Task');

		table.float('depth');
		table.string('methodUsed').index();
		table.text('variable');
		table.text('result');

		table.bigInteger('company').unsigned()
			.references('id').inTable('Person');
	})
	// Fields and Crops
	.createTable('Field', table => {
		table.bigIncrements('id');
		table.specificType('path', 'polygon').index(null, 'GiST');

		table.specificType('gridWidths', 'real[]');
		table.specificType('gridHeights', 'real[]');

		table.bigInteger('parent').unsigned()
			.references('id').inTable('Field');
	})
	.createTable('Crop', table => {
		table.bigIncrements('id');

		table.bigInteger('type')
			.unsigned().notNullable().index()
			.references('id').inTable('Plant');
		table.bigInteger('fieldId')
			.unsigned().notNullable().index()
			.references('id').inTable('Field');
		table.text('predictedNutrientReq');
		table.date('expectedHarvest');
	})
	// Information tables
	.createTable('Item', table => {
		table.bigIncrements('id');
		table.text('name').index();
		
		table.text('sku').unique().index();
		table.text('barcode').unique();

		table.bigInteger('supplierId').unsigned().index()
			.references('id').inTable('Person');
		
		table.specificType('lifespan', 'interval').index();
		table.specificType('value', 'money');
		table.specificType('salvageValue', 'money');
	})
	.createTable('Plant', table => {
		table.inherits('Item');
		table.text('latin').index().unique();
	})
	.createTable('Location', table => {
		table.bigIncrements('id');
		table.text('name');
		table.json('position');
		table.bigInteger('fieldId').unsigned().unique()
			.references('id').inTable('Field');
	})
	.createTable('Program', table => {
		table.bigIncrements('id');
		table.text('name').index();
		table.string('color', 6); 
		table.string('text_color', 6).defaultTo('000000'); 

		table.bigInteger('linkedAccount').unsigned()
			.references('id').inTable('Account');
	})
	.createTable('ProgramUsage', table => {
		table.bigIncrements('id');
		table.bigInteger('programId')
			.unsigned().notNullable()
			.references('id').inTable('Program');
		table.bigInteger('taskId')
			.unsigned().notNullable()
			.references('id').inTable('Task');
	})
	.createTable('Account', table => {
		table.bigIncrements('id');
		table.text('name').index();
		table.text('number').index();
		table.text('sortCode').index();
		table.text('taxReference');
		table.text('ubcReference');
	})
	.createTable('Chemical', table => {
		table.bigIncrements('id');
		table.string('type').index();
		table.text('productName');
		table.json('composition');
	})
	// Sales and Grants
	.createTable('Sale', table => {
		table.bigIncrements('id');

		table.timestamp('order_date');
		table.timestamp('delivery_date');

		table.integer('budgetLineNumber');

		table.bigInteger('customerId')
			.unsigned().index()
			.references('id').inTable('Person');

		table.bigInteger('deliveryLocation')
			.unsigned().index()
			.references('id').inTable('Location');
		
		table.integer('quantity').defaultTo(1);
		table.specificType('price', 'money');
		
		table.specificType('discount', 'money');
		table.specificType('tax', 'money');
		
		table.text('notes');
	})
	.createTable('Grant', table => {
		table.inherits('sale');
		table.text('grantName');
	})
	// Research Projects
	.createTable('ResearchProject', table => {
		table.bigIncrements('id');
		table.bigInteger('researcher')
			.unsigned().notNullable().unique()
			.references('id').inTable('Researcher');
		
		table.text('title');
		table.specificType('date', 'daterange').index();

		table.integer('postDocs').defaultTo(0);
		table.integer('phds').defaultTo(0);
		table.integer('masters').defaultTo(0);
		table.integer('bachelors').defaultTo(0);
		table.integer('others').defaultTo(0);

		table.specificType('grantValue', 'money');
		table.text('grantSource');
		table.text('publications');
	})
	.createTable('ResearchPartner', table => {
		table.bigIncrements('id');
		
		table.bigInteger('person')
			.unsigned().notNullable()
			.references('id').inTable('Researcher');
		table.bigInteger('project')
			.unsigned().notNullable()
			.references('id').inTable('ResearchProject');
	})
	.createTable('Mix', table => {
		table.bigIncrements('id');

		table.bigInteger('forId')
			.unsigned().notNullable()
			.references('id').inTable('Plant');

		table.bigInteger('subId')
			.unsigned().notNullable()
			.references('id').inTable('Plant');
	})
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('Person')
		.dropTableIfExists('Employee')
		.dropTableIfExists('Researcher')
		.dropTableIfExists('Assignment')
		.dropTableIfExists('Equipment')
		.dropTableIfExists('EquipmentUsage')
		.dropTableIfExists('Event')
		.dropTableIfExists('Task')
		.dropTableIfExists('Seeding')
		.dropTableIfExists('ChemicalTask')
		.dropTableIfExists('Irrigation')
		.dropTableIfExists('Fertilizing')
		.dropTableIfExists('PestControl')
		.dropTableIfExists('Scouting')
		.dropTableIfExists('ScoutHarvest')
		.dropTableIfExists('ScoutPest')
		.dropTableIfExists('SoilSampling')
		.dropTableIfExists('Field')
		.dropTableIfExists('Crop')
		.dropTableIfExists('Plant')
		.dropTableIfExists('Item')
		.dropTableIfExists('Location')
		.dropTableIfExists('Program')
		.dropTableIfExists('ProgramUsage')
		.dropTableIfExists('Chemical')
		.dropTableIfExists('Sale')
		.dropTableIfExists('Grant')
		.dropTableIfExists('ResearchProject')
		.dropTableIfExists('ResearchPartner')
		.dropTableIfExists('Account')
		.dropTableIfExists('Mix')
}