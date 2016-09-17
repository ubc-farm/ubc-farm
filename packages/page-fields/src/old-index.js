import map from './map/index.js';
import connector from './map/render.js';
import { observeMap } from './weather/index.js';

connector(map.data);
observeMap(map, document.getElementById('weather-mount'));

export default map;
