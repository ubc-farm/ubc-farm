const { resolve } = require('path');
const build = require('./code/build.js');

const [,, arg] = process.argv;
let cwd;
if (arg === '__dirname') {
	cwd = resolve(__dirname, '../../');
} else if (arg) {
	cwd = resolve(arg);
} else {
	cwd = process.cwd();
}

build(cwd).catch(err => console.error(err));
