const iconHelper = require('../../_helpers/icon.js')

const template = require('./template.marko');

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