## Members

<dl>
<dt><a href="#activeProp">activeProp</a> : <code>string</code></dt>
<dd><p>used to identify the active field in the map</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#color">color</a> : <code>Object</code></dt>
<dd><p>color defaults used in other styles</p>
</dd>
<dt><a href="#field">field</a> : <code>Object</code></dt>
<dd><p>field polygon options</p>
</dd>
<dt><a href="#newField">newField</a> : <code>Object</code></dt>
<dd><p>styles for an unsaved field</p>
</dd>
<dt><a href="#map">map</a> : <code>Object</code></dt>
<dd><p>map styles, can be passed as options to <code>new google.maps.Map()</code></p>
</dd>
<dt><a href="#grid">grid</a> : <code>Object</code></dt>
<dd><p>options for the grid polygons</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#updateActive">updateActive(newActive, lastActive)</a></dt>
<dd><p>Updates the polygons on the map by setting the &#39;activeField&#39;
property on the current selected polygon for the store.</p>
</dd>
<dt><a href="#connectToStore">connectToStore(mapData, store)</a> ⇒ <code>Array.&lt;function()&gt;</code></dt>
<dd><p>Connects the given map data object to a redux store.
Click events are passed as setSelected actions,
and updates to the active state are reflected in the map.</p>
</dd>
<dt><a href="#isActive">isActive()</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#styleActiveField">styleActiveField()</a></dt>
<dd><p>Used by data.setStyle. Applies fieldStyle.selected or fieldStyle.normal,
depending on if the activeProp is present.</p>
</dd>
<dt><a href="#fetchGeoJson">fetchGeoJson(mapData)</a> ⇒ <code>Promise.&lt;Array.&lt;google.maps.Data.Feature&gt;&gt;</code></dt>
<dd><p>Same functionality as data.loadGeoJson, but using the fetch
API instead and returning a Promise. data.loadGeoJson seems to have
some bugs so I&#39;m using this function instead.</p>
</dd>
</dl>

<a name="activeProp"></a>

## activeProp : <code>string</code>
used to identify the active field in the map

**Kind**: global variable  
<a name="color"></a>

## color : <code>Object</code>
color defaults used in other styles

**Kind**: global constant  
<a name="field"></a>

## field : <code>Object</code>
field polygon options

**Kind**: global constant  
<a name="newField"></a>

## newField : <code>Object</code>
styles for an unsaved field

**Kind**: global constant  
<a name="map"></a>

## map : <code>Object</code>
map styles, can be passed as options to `new google.maps.Map()`

**Kind**: global constant  
<a name="grid"></a>

## grid : <code>Object</code>
options for the grid polygons

**Kind**: global constant  
<a name="updateActive"></a>

## updateActive(newActive, lastActive)
Updates the polygons on the map by setting the 'activeField'property on the current selected polygon for the store.

**Kind**: global function  
**this**: <code>{google.maps.Data}</code>  

| Param | Type | Description |
| --- | --- | --- |
| newActive | <code>string</code> | ID of the polygon that is now active |
| lastActive | <code>string</code> | ID of the polygon that was previously marked active |

<a name="connectToStore"></a>

## connectToStore(mapData, store) ⇒ <code>Array.&lt;function()&gt;</code>
Connects the given map data object to a redux store.Click events are passed as setSelected actions,and updates to the active state are reflected in the map.

**Kind**: global function  
**Returns**: <code>Array.&lt;function()&gt;</code> - invoke both functions to remove listeners  

| Param | Type |
| --- | --- |
| mapData | <code>google.maps.Data</code> | 
| store | <code>Store</code> | 

<a name="isActive"></a>

## isActive() ⇒ <code>boolean</code>
**Kind**: global function  
**Returns**: <code>boolean</code> - is this feature marked active  
<a name="styleActiveField"></a>

## styleActiveField()
Used by data.setStyle. Applies fieldStyle.selected or fieldStyle.normal,depending on if the activeProp is present.

**Kind**: global function  
<a name="fetchGeoJson"></a>

## fetchGeoJson(mapData) ⇒ <code>Promise.&lt;Array.&lt;google.maps.Data.Feature&gt;&gt;</code>
Same functionality as data.loadGeoJson, but using the fetchAPI instead and returning a Promise. data.loadGeoJson seems to havesome bugs so I'm using this function instead.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;google.maps.Data.Feature&gt;&gt;</code> - newly added features  

| Param | Type | Description |
| --- | --- | --- |
| mapData | <code>google.maps.Data</code> | layer to add to |

