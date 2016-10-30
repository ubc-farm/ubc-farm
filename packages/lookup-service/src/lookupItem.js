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
	.then(({ query: { pages } }) => {
		const id = parseInt(Object.keys(pages)[0], 10);
		// if (id === -1) throw new NotFoundError();

		const plantData = pages[id];

		if (!plantData.images) return { info: plantData.fullurl, image: null };

		return fetch(ENDPOINT + stringify({
			action: 'query',
			format: 'json',
			prop: 'imageinfo',
			iiprop: 'url',
			titles: plantData.images[plantData.images.length - 1].title,
		}))
		.then(res => res.json())
		.then(({ query: { pages: imagePages } }) => {
			const imageId = parseInt(Object.keys(imagePages)[0], 10);
			const { imageinfo: [{ url }] } = imagePages[imageId];

			return {
				info: plantData.fullurl,
				image: url,
			};
		});
	});
}
