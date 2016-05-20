const template = require('./template.marko');
const money = require('../../_helpers/money.js')

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
	
	for (row in data) {
		let {revenue, expenses} = row;
		let profit = revenue - expenses;
		
		row.revenue = money.toMoney(revenue);
		row.expenses = money.toMoney(expenses);
		row.profit = money.toMoney(profit);
	}
	
	template.render({
		data: data,
		color: color
	}, out);
}