import * as Joi from 'joi';

export const getEmployee = {
	method: 'GET',
	path: '/employees/{id}',
	handler: ({ params: { id } }, reply) => reply.knex(knex =>
		knex('employees')
			.where('id', id)
			.join('people', 'employees.id', 'people.id')
			.join('people', 'employees.emergencyContact', 'people.id')
			.first()
			.then(employee => Object.assign(employee, {
				addressMailing: JSON.parse(employee.addressMailing),
				addressPhysical: JSON.parse(employee.addressPhysical),
				holidayDays: JSON.parse(employee.holidayDays),
				sickDays: JSON.parse(employee.sickDays),
				paidLeaveDays: JSON.parse(employee.paidLeaveDays),
				inLieuHours: JSON.parse(employee.inLieuHours),
				medicalLeaveTime: JSON.parse(employee.medicalLeaveTime),
				workingDays: JSON.parse(employee.workingDays),
			})),
	).type('application/json'),
};

export const saveEmployee = {
	method: 'POST',
	path: '/employees/{id?}',
	handler: ({ params, payload }, reply) => reply.knex((knex) => {
		const employee = Object.assign({}, payload, {
			id: params.id || payload.id,
			role: payload.role || 'Employee',
			addressMailing: JSON.stringify(payload.addressMailing),
			addressPhysical: JSON.stringify(payload.addressPhysical),
			holidayDays: JSON.stringify(payload.holidayDays),
			sickDays: JSON.stringify(payload.sickDays),
			paidLeaveDays: JSON.stringify(payload.paidLeaveDays),
			inLieuHours: JSON.stringify(payload.inLieuHours),
			medicalLeaveTime: JSON.stringify(payload.medicalLeaveTime),
			workingDays: JSON.stringify(payload.workingDays),
		});

		return Promise.all([
			knex('people').insert(employee),
			knex('employees').insert(employee),
		]).then(() => [payload.id]);
	}),
};
