import denodeify from 'denodeify';
import {
	readdir,
	stat,
	readFile,
	writeFile,
} from 'fs';

const readdirAsync = denodeify(readdir);
const statAsync = denodeify(stat);
const readFileAsync = denodeify(readFile);
const writeFileAsync = denodeify(writeFile);

export {
	readdirAsync as readdir,
	statAsync as stat,
	readFileAsync as readFile,
	writeFileAsync as writeFile,
}
