import * as column from './columnlist.js';

const has = Object.prototype.hasOwnProperty;
const endpoints = ['people', 'employees', 'researchers'];

function buildRow(obj, columns = column) {
	const row = new WeakMap();
	for (const key in obj) {
		if (key in columns) row.set(columns[key], obj[key]);
	}
	return row;
}

export default Promise.all(endpoints.map(e => fetch(`/api/${e}`)))
.then(responses => Promise.all(responses.map(response => response.json())))
.then(([people, employees, researchers]) => {
	const map = new Map();

	for (const key in people) {
		if (has.call(people, key)) {
			const value = Object.assign({}, people[key]);
			switch (value.role) {
				case 'Restaurant': value.icon = 'restaurant'; break;
				case 'Customer': value.icon = 'person'; break;
				case 'Supplier': value.icon = 'business_center'; break;
				default: break;
			}

			map.set(`person-${key}`, buildRow(value));
		}
	}

	for (const key in employees) {
		if (has.call(employees, key)) {
			const value = Object.assign({
				role: 'Employee',
				icon: 'business',
			}, employees[key]);

			map.set(`employee-${key}`, buildRow(value));
		}
	}

	for (const key in researchers) {
		if (has.call(researchers, key)) {
			const value = Object.assign({ role: 'Researcher' }, researchers[key]);
			map.set(`researcher-${key}`, buildRow(value));
		}
	}

	return map;
});
