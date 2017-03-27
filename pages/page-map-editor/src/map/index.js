import 'ubc-farm-page-fields/src/map/get-api.js';
import store from '../redux/index.js';
import map, { data as mapData } from './map.js';

import connectStoreToMapData from './connect-store.js';
import createPolygonListeners from './polygon-listeners.js';
import startSelectionListener from './select-cells.js';
import startStyler from './styler.js';

connectStoreToMapData(store, mapData);
createPolygonListeners(store, mapData);
startSelectionListener(undefined, mapData);
startStyler(undefined, mapData);

export default map;
