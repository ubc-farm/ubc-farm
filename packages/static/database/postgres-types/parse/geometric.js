/**
 * Functions for parsing PostgreSQL geometry
 * @see https://www.postgresql.org/docs/9.5/static/datatype-geometric.html
 * @module backend/database/pg-types/parse/geometric
 */

const pointRE = /^\( ([0-9.]+) , ([0-9.]+) \)$/;
/**
 * Converts a PostgreSQL point to a float array.
 * @param {string} value - point in format ( x , y )
 * @returns {float[]} point in format [x, y]
 */
export function point(value) {
	const [, x, y] = pointRE.exec(value);
	return [x, y];
}

const pathRE = new RegExp('^[\[\(](?: \( ([0-9.]+) , ([0-9.]+) \) ,)+'
                        + '(?: \( ([0-9.]+) , ([0-9.]+) \) )[\]\)]$');
/**
 * Converts a PostgreSQL path to a point array.
 * @param {string} value - path in format ( ( x1 , y1 ) , ... , ( xn , yn ) )
 * @returns {float[][]} path in format [[x1, y1], [xn, yn]]. 
 * Result will have property open if the path is open.
 */
export function path(value) {
	let newArr = [];
	if (value.startsWith('[') && value.endsWith(']')) newArr.open = true;
	const result = pathRE.exec(value);
	for (let i = 1; i < result.length; i+=2) {
		newArr.push([ parseFloat(result[i]), parseFloat(result[i+1]) ]);
	}
	return newArr;
}

const circleRE = /^< \( ([0-9.]+) , ([0-9.]+) \) , ([0-9.]+) >$/;
/**
 * Converts a PostgreSQL circle to an object
 * @param {string} value - circle in format < ( x , y ) , r >
 * @returns {Object} where center is a point and radius is a float
 */
export function circle(value) {
	const [, x, y, r] = circleRE.exec(value);
	return {
		center: [parseFloat(x), parseFloat(y)], 
		radius: parseFloat(r)
	};
}