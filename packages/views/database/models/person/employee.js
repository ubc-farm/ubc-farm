import {Model} from 'objection';
import {Task} from '../index.js';
import Person from './person.js';

/**
 * Extends Person with timetable information. Task assignments are also
 * joined to employees
 * @alias module:app/models.Employee
 * @extends module:app/models.Person
 * @property {number} [hourlyPay]
 * @property {boolean} [fullOrPartTime] true if full time, false if part time
 * @property {integer[]} [holidayDays=[]]
 * @property {integer[]} [sickDays=[]]
 * @property {integer[]} [paidLeaveDays=[]]
 * @property {Object} [inLieuHours] - an interval object
 * @property {Date[][]} [medicalLeaveTime] - an array of tsrange values
 * @property {string} [emergencyContactName]
 * @property {string} [emergencyContactNumber]
 */
export default class Employee extends Person {
	static get tableName() {return 'Employee'}
	static get label() {return 'employees'}

	/** @type {Object} Working days as an object */
	get workingDays() {
		return {
			sunday: this.working_sunday,
			monday: this.working_monday,
			tuesday: this.working_tuesday,
			wednesday: this.working_wednesday,
			thursday: this.working_thursday,
			friday: this.working_friday,
			saturday: this.working_saturday
		}
	}
	set workingDays(obj) {
		for (let day in obj) this[`working_${day}`] = obj[day];
	}

	/** @type {boolean[]} */
	get workingDaysArray() {
		return Object.keys(this.workingDays)
			.map(day => this.workingDays[day]);
	}
	set workingDaysArray(arr) {
		this.working_sunday = arr[0];
		this.working_monday = arr[1];
		this.working_tuesday = arr[2];
		this.working_wednesday = arr[3];
		this.working_thursday = arr[4];
		this.working_friday = arr[5];
		this.working_saturday = arr[6];
	}

	/** @type {Date[]} */
	get holiday() {this.holidayDays.map(n => new Date(n))}
	set holiday(dates) {this.holidayDays = dates.map(d => d.getTime())}

	/** @type {Date[]} */
	get sick() {this.sickDays.map(n => new Date(n))}
	set sick(dates) {this.sickDays = dates.map(d => d.getTime())}

	/** @type {Date[]} */
	get paidLeave() {this.paidLeaveDays.map(n => new Date(n))}
	set paidLeave(dates) {this.paidLeaveDays = dates.map(d => d.getTime())}

	static get jsonSchema() {
		return Object.assign(super.jsonSchema, {
			hourlyPay: {type: 'integer'},
			fullOrPartTime: {type: 'boolean'},
			holidayDays: {type: 'array', unqiueItems: true},
			sickDays: {type: 'array', unqiueItems: true},
			paidLeaveDays: {type: 'array', unqiueItems: true},
			inLieuHours: {type: 'array', unqiueItems: true},
			medicalLeaveTime: {type: 'array', unqiueItems: true},
			working_sunday: {type: 'boolean'},
			working_monday: {type: 'boolean'},
			working_tuesday: {type: 'boolean'},
			working_wednesday: {type: 'boolean'},
			working_thursday: {type: 'boolean'},
			working_friday: {type: 'boolean'},
			working_saturday: {type: 'boolean'},
			emergencyContactName: {
				type: 'string'
			},
			emergencyContactNumber: {
				type: 'string',
				minLength: 15,
				maxLength: 15
			}
		})
	}

	static get relationMappings() {
		return Object.assign({
			assignments: {
				relation: Model.ManyToManyRelation,
				modelClass: Task,
				join: {
					from: 'Employee.id',
					through: {
						modelClass: Assignment,
						from: 'Assignment.assigned_employee',
						to: 'Assignment.assigned_task'
					},
					to: 'Task.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Helper table to join Employees with their assigned Tasks
 */
export class Assignment extends Model {
	static get tableName() {return 'Assignment'}

	static get relationMappings() {
		return {
			assignedEmployee: {
				relation: Model.OneToManyRelation,
				modelClass: Employee,
				join: {
					from: 'Assignment.assigned_employee',
					to: 'Employee.id'
				}
			},
			assignedTask: {
				relation: Model.OneToManyRelation,
				modelClass: Task,
				join: {
					from: 'Assignment.assigned_task',
					to: 'Task.id'
				}
			}
		}
	}
}