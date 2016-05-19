const iconHelper = require('../../_helpers/icon.js');

const template = require('./template.marko');

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