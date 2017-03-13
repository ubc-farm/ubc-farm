import baseConfig from '../../rollup.config.js';

const [nodeResolve, commonjs, json, nodeGlobals,, babel] = baseConfig.plugins;

export default {
	entry: 'src/index.js',
	targets: [
		{ dest: 'index.mjs', format: 'es' },
		{ dest: 'index.js', format: 'cjs' },
	],
	sourceMap: true,
	plugins: [
		nodeResolve,
		commonjs,
		json,
		nodeGlobals,
		babel,
	],
	external: [
		'react', 'react-virtualized',
		'pouchdb', 'pouchdb-find', 'transform-pouch',
		'@ubc-farm/databases',
	],
};
