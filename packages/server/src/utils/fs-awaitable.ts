import denodeify from 'denodeify';
import {
	readdir,
	readFile,
} from 'fs';

const readdirAsync = denodeify(readdir);
const readFileAsync = denodeify(readFile);

export {
	readdirAsync as readdir,
	readFileAsync as readFile,
}
