import map from './map/index.js';
import connector from './map/render.js';
import attachWeatherTo from './weather/w-map.js';

connector(map.data);
attachWeatherTo(map);

export default map;