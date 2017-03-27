## Classes

<dl>
<dt><a href="#WeatherDisplay">WeatherDisplay</a></dt>
<dd><p>Displays weather data pulled from OpenWeatherMap.
The provided position is used to find weather data.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#WEATHER_API">WEATHER_API</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#renderWeather">renderWeather()</a></dt>
<dd></dd>
<dt><a href="#observeMap">observeMap(map, element)</a> ⇒ <code>function</code></dt>
<dd><p>Attaches the weather component to the given Google Map,
and updates itself when the map moves so the weather reflects
the current focus of the map.</p>
</dd>
</dl>

<a name="WeatherDisplay"></a>

## WeatherDisplay
Displays weather data pulled from OpenWeatherMap.The provided position is used to find weather data.

**Kind**: global class  
<a name="WEATHER_API"></a>

## WEATHER_API
**Kind**: global constant  
**Todo**

- [ ] use rollup to replace with env variable

<a name="renderWeather"></a>

## renderWeather()
**Kind**: global function  
**Jsx**: createElement  
<a name="observeMap"></a>

## observeMap(map, element) ⇒ <code>function</code>
Attaches the weather component to the given Google Map,and updates itself when the map moves so the weather reflectsthe current focus of the map.

**Kind**: global function  
**Returns**: <code>function</code> - call to remove listener  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>google.maps.Map</code> |  |
| element | <code>Element</code> | on document to place map |

