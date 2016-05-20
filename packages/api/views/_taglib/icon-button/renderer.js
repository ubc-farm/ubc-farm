const iconHelper = require('../../_helpers/icon.js')

const template = require('./template.marko');

/**
 * @param {Object} input
 * @param {string} [input.icon] - icon shown to the left of the text
 * @param {string} [input.label] - text shown on the button
 * @param {number} [input.size=24] - width and height for the icon
 * @param {string} [input.id] - id for the button
 * @param {string} [input.class] - addtional classes for the button
 */
exports.renderer = (input, out) => {
	let className = input.class ? ' ' + input.class : '';
	let {icon, label, size, id} = input;
	
	template.render({
		id: id,
		className: "i-button icon-text" + className,
		icon: (icon? iconHelper.format(icon) : null),
		label: label,
		size: (size? size : '24')
	}, out);
}