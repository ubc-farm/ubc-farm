import fetch from 'node-fetch';
import { stringify } from 'querystring';

const ENDPOINT = 'https://en.wikipedia.org/w/api.php?';

export class NotFoundError extends Error {}

export default function lookupItem(latinName) {
	return fetch(ENDPOINT + stringify({
		action: 'query',
		format: 'json',
		prop: 'images|info',
		inprop: 'url',
		titles: latinName,
	}))
	.then(res => res.json())
	.then(({ query: { pages }}) => {
		const id = parseInt(Object.keys(pages)[0], 10);
		if (id === -1) throw new NotFoundError();

		const plantData = pages[id];
		return {
			// latinName,
			info: plantData.fullurl,
			image: plantData.images.length > 0 ? plantData.images[0].title : null
		};
	});
}
