import baseConfig from '../../rollup.config.js';

const [nodeResolve, commonjs, json,,, babel] = baseConfig.plugins;

export default {
	sourceMap: true,
	plugins: [
		nodeResolve,
		commonjs,
		json,
		babel,
	],
	external: [
		'react', 'pouchdb', 'pouchdb-find', 'transform-pouch', '@ubc-farm/databases'
	],
};
