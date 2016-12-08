import * as Joi from 'joi';

export const getResearcher = {
	method: 'GET',
	path: '/researchers/{id}',
	handler: ({ params: { id } }, reply) => reply.knex(knex =>
		knex('researchers')
			.where('id', id)
			.join('people', 'researchers.id', 'people.id')
			.first()
			.then(researcher => Object.assign(researcher, {
				addressMailing: JSON.parse(researcher.addressMailing),
				addressPhysical: JSON.parse(researcher.addressPhysical),
				coursesTaught: JSON.parse(researcher.coursesTaught),
			})),
	).type('application/json'),
};

export const saveResearcher = {
	method: 'POST',
	path: '/researchers/{id?}',
	handler: ({ params, payload }, reply) => reply.knex((knex) => {
		const researcher = Object.assign({}, payload, {
			id: params.id || payload.id,
			role: payload.role || 'Researcher',
			addressMailing: JSON.stringify(payload.addressMailing),
			addressPhysical: JSON.stringify(payload.addressPhysical),
			coursesTaught: JSON.stringify(payload.coursesTaught),
		});

		return Promise.all([
			knex('people').insert(researcher),
			knex('researchers').insert(researcher),
		]).then(() => [researcher.id]);
	}),
};
