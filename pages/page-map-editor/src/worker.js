import {register} from 'promise-worker';
import buildGrid from './autogrid/index.js';
import mergeCells from './gridmerge/index.js';

register(msg => {
	if ('feature' in msg) return buildGrid(msg.feature);
	else if ('cells' in msg) return mergeCells(msg.cells);
	else throw Error('Invalid message');
});