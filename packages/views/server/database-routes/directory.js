import {Person, Employee, Researcher} from '../../database/index.js';
import {
	transformReply,
	getBooleanQuery,
	arrayToObjectMap,
	removeNullandUndef
} from './transformer.js';
import {validate} from './transformer-validation.js';

/**
 * Retrieve all people from the database and reply with them
 */
export function directory(request, reply) {
	let query = Promise.all([
		Person.query(), Employee.query(), Researcher.query()
	]).then(([people, employees, researchers]) => {
		employees = employees.map(val => {val.role = 'Employee'; return val})
		researchers = researchers.map(val => {val.role = 'Researcher'; return val})

		return people.concat(employees, researchers);
	});

	const {array = false, clean = true} = getBooleanQuery(request.query);

	if (!array) query = query.then(list => arrayToObjectMap(list));
	if (clean) query = query.then(data => removeNullandUndef(data));

	return transformReply(query, request, reply);
}

/**
 * Retrieves a specific subset of the directory specified by the role provided
 */
export function roleDirectory(request, reply) {
	const {role} = request.params;

	let query;
	if (role === 'Employee') query = Employee.query();
	else if (role === 'Researcher') query = Researcher.query();
	else query = Person.query().where('role', '=', role);

	const {array = false} = request.query;
	if (!array) query = query.then(list => arrayToObjectMap(list));

	return transformReply(query, request,	reply);
}

export default [
	{
		method: 'GET',
		path: '/api/directory',
		handler: directory,
		config: {cors: true, validate}
	},
	{
		method: 'GET',
		path: '/api/directory/{role}',
		handler: roleDirectory,
		config: {cors: true, validate}
	}
];