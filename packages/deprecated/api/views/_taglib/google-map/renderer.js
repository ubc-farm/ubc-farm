const map_template = require('./template.marko');
const ui_template = require('./buttons.marko');

exports.renderer = (input, out) => {
	let {ui} = input;
	
	if (ui) {
		ui_template.render({}, out);
	} else {
		map_template.render({}, out);
	}
}