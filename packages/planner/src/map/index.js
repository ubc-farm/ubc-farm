import map, { data } from './map.js';
import observe from './onclick.js';
import getApi from './fetch.js';

export { default as style } from './style.js';
observe();
getApi(data);

export default map;
