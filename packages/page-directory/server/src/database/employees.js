import * as Joi from 'joi';

export const getEmployee = {
	method: 'GET',
	path: '/employees/{id}',
	handler: (request, reply) => reply(
		knex('employees')
			.where('id', id)
			.join('people', 'employees.id', 'people.id')
			.join('people', 'employees.emergencyContact', 'people.id')
			.first()
			.then((employee) => Object.assign(employee, {
				addressMailing: JSON.parse(employee.addressMailing),
				addressPhysical: JSON.parse(employee.addressPhysical),
				holidayDays: JSON.parse(employee.holidayDays),
				sickDays: JSON.parse(employee.sickDays),
				paidLeaveDays: JSON.parse(employee.paidLeaveDays),
				inLieuHours: JSON.parse(employee.inLieuHours),
				medicalLeaveTime: JSON.parse(employee.medicalLeaveTime),
				workingDays: JSON.parse(employee.workingDays),
			}))
	).type('application/json'),
};

export const saveEmployee = {
	method: 'GET',
	path: '/employees/{id}',
	handler(request, reply) {

	},
};
