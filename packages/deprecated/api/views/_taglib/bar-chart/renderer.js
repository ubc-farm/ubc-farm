const template = require('./template.marko');

/**
 * @typedef {Object} ChartRow
 * @property {string} name - name of the object that this bar belongs to
 * @property {string} [url] - url for more info about the object
 * @property {number} revenue in cents
 * @property {integer} expenses in cents
 */

/**
 * @param {Object} input
 * @param {ChartRow[]} input.data - data for chart
 * @param {string} input.color - class that indicates color for chart
 */
exports.renderer = (input, out) => {
	let {data, color} = input;
	
	let maxList = [];
	let minList = [];
	for (row in data) {
		let {revenue, expenses} = row;
		let profit = row.profit = revenue - expenses;
		
		maxList.push(revenue);
		minList.push(profit);
	}
	
	let min = Math.min(minList);
	
	template.render({
		data: data,
		max: Math.max(maxList),
		min: min < 0 ? min : 0,
		color: color
	}, out);
}