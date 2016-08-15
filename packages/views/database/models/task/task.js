import {Model} from 'objection';
import {Location, Program, Employee, Equipment} from '../index.js';
import {Assignment, EquipmentUsage, ProgramUsage} from '../joins';

/**
 * Common attributes for tasks that other tables inherit.
 * @alias module:app/models.Task
 * @property {number} [start_time] - tsrange representing the task time
 * @property {number} [end_time] - tsrange representing the task time
 * @property {Object} [hoursTaken] - interval showing how long the 
 * task actually took.
 * @property {string} [locationId]
 */
export default class Task extends Model {
	static get tableName() {return 'Task'}

	static get jsonSchema() {return {
		type: 'object',
		properties: {
			start_time: {type: 'integer'},
			end_time: {type: 'integer'},
			locationId: {type: 'integer'}
		}
	}}

	/** @type {Date} */
	get start() {return new Date(this.start_time);}
	set start(date) {this.start_time = date.getTime();}
	/** @type {Date} */
	get end() {return new Date(this.end_time);}
	set end(date) {this.end_time = date.getTime();}

	/** @type {integer} different between start and end in milliseconds */
	get hoursTaken() {
		const [start, end] = this.time;
		return end - start;
	}

	static get relationMappings() {
		return {
			/** 
			 * Location for this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Location} 
			 */
			location: {
				relation: Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Task.locationId',
					to: 'Location.id'
				}
			},
			/** 
			 * Programs that this task is linked to 
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Program[]}
			 */
			program: {
				relation: Model.ManyToManyRelation,
				modelClass: Program,
				join: {
					from: 'Task.id',
					through: {
						modelClass: ProgramUsage,
						from: 'ProgramUsage.taskId',
						to: 'ProgramUsage.programId'
					},
					to: 'Program.id'
				}
			},
			/** 
			 * Employees assigned to this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Employee[]} 
			 */
			labour: {
				relation: Model.ManyToManyRelation,
				modelClass: Employee,
				join: {
					from: 'Task.id',
					through: {
						modelClass: Assignment,
						from: 'Assignment.assigned_task',
						to: 'Assignment.assigned_employee'
					},
					to: 'Employee.id'
				}
			},
			/** 
			 * Equipment used by this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Equipment[]} 
			 */
			equipment: {
				relation: Model.ManyToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Task.id',
					through: {
						modelClass: EquipmentUsage,
						from: 'EquipmentUsage.taskUsage',
						to: 'EquipmentUsage.equipment'
					},
					to: 'Equipment.id'
				}
			}
		}
	}
}