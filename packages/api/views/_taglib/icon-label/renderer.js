const path = require('path').posix;
const iconHelper = require('../../_helpers/icon.js')

const template = require('./template.marko');

exports.renderer = (input, out) => {
	let {text, icon, href, tab, active} = input;
	
	href = path.join('/', href);
	
	template.render({
		text: text,
		icon: iconHelper.format(icon),
		href: href,
		tabindex: (tab? 0 : false),
		active: active
	}, out);
}