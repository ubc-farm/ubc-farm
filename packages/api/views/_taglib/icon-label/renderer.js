const path = require('path');

const template = require('./template.marko');

exports.renderer = (input, out) => {
	let {text, icon, href} = input;
	
	icon = path.basename(icon, '.svg'); // strip path and extension
	icon = path.format({
		dir: '/assets/images/icons',
		name: icon,
		ext: '.svg'
	});
	
	href = path.join('/', href);
	
	template.render({
		text: text,
		icon: icon,
		href: href
	}, out);
}