const path = require('path');
const iconHelper = require('../../_helpers/icon.js')

const template = require('./template.marko');

exports.renderer = (input, out) => {
	let {text, icon, href} = input;
	
	href = path.join('/', href);
	
	template.render({
		text: text,
		icon: iconHelper.format(icon),
		href: href
	}, out);
}