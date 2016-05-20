const iconHelper = require('../../_helpers/icon.js');

const template = require('./template.marko');

/**
 * @param {Object} input
 * @param {string} input.text - text shown on the tab
 * @param {string} input.icon - icon name, passed to iconHelper
 * @param {string} input.href - url for the tab's link
 * @param {boolean} input.active - does this tab represent the current page?
 */
exports.renderer = (input, out) => {
	let {text, icon, href, active} = input;
	let thisC = active ? "this" : "";
	href = href? href : '/' + text.toLowerCase();
	
	template.render({
		text: text,
		icon: iconHelper.format(icon),
		href: href,
		className: "inline icon-text i-tab" + thisC;
	}, out);
}