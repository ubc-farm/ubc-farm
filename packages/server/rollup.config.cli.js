export default {
	entry: 'bin/src/index.js',
	dest: 'bin/ubc-farm-server',
	format: 'cjs',
	banner: '#!/user/bin/env node',
	external: ['minimist', 'ubc-farm-server'],
	paths: { 'ubc-farm-server': '../dist/index.cjs.js' },
};
