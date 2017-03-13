import baseConfig from '../../rollup.config.js';

const pkg = require('./package.json');

export default {
	entry: 'src/index.ts',
	targets: [
		{ dest: 'index.mjs', format: 'es' },
		{ dest: 'index.js', format: 'cjs' },
	],
	sourceMap: true,
	moduleName: 'react_inputs',
	plugins: baseConfig.plugins,
	external: [
		...Object.keys(pkg.dependencies),
		...Object.keys(pkg.optionalDependencies),
	],
};
