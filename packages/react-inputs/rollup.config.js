import baseConfig from '../../rollup.config.js';

const [nodeResolve, commonjs, json,, typescript] = baseConfig.plugins;

export default {
	sourceMap: true,
	moduleName: 'react_inputs',
	plugins: [
		nodeResolve,
		commonjs,
		json,
		typescript,
	],
	external: [
		'react', 'pouchdb', 'pouchdb-find', 'transform-pouch', 'moment',
	],
	globals: {
		react: 'React',
		moment: 'moment',
		pouchdb: 'PouchDB',
		lodash: '_',
	},
};
