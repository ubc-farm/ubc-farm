const iconHelper = require('../../_helpers/icon.js');

const template = require('./template.marko');

/**
 * @param {Object} input
 * @param {string} input.text - text shown on the tab
 * @param {string} input.icon - icon name, passed to iconHelper
 * @param {string} input.href - url for the tab's link
 * @param {boolean} input.active - does this tab represent the current page?
 * @param {boolean} local - generate local links
 * @param {boolean} radio - generate radio tabs instead of links
 */
exports.renderer = (input, out) => {
	let {text, icon, href, active, local, radio, name} = input;
	icon = icon? icon : text.toLowerCase();
	let pre = local? '#' : '/';
	if (!href) {
		href = pre + text.toLowerCase();
	} else if (local && !href.startsWith(pre)) {
		href = pre + href;
	}
	
	template.render({
		text: text,
		icon: iconHelper.format(icon),
		href: href,
		name: name ? name : 'icon-tab',
		className: {
			"inline icon-text i-tab": true, 
			"this": active,
			"i-radio-label": radio
		},
		radio: radio
	}, out);
}