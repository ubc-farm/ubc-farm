import { createElement, Component } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';

/** @todo use rollup to replace with env variable */
const WEATHER_API = process.env.WEATHER_API || '84c885cba4b86046e2e6f506d2f86a09';

interface WeatherProps {
	lat: number,
	lng: number,
	delay: number,
}

interface WeatherState {
	weatherData: any | null,
	timestamp: number,
	failed: boolean,
}

/**
 * Displays weather data pulled from OpenWeatherMap.
 * The provided position is used to find weather data.
 */
export class WeatherDisplay extends Component<WeatherProps, WeatherState> {
	constructor(props: WeatherProps) {
		super(props);

		this.state = {
			weatherData: null,
			timestamp: Date.now(),
			failed: false,
		};

		this.updateWeatherState();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props)	{
			const delay = this.props.delay;
			const now = Date.now();
			if (now - this.state.timestamp > delay) {
				this.setState({ timestamp: now });
				this.updateWeatherState(nextProps);
			}
		}
	}

	async updateWeatherState({ lat, lng } = this.props) {
		const res = await fetch('http://api.openweathermap.org/data/2.5/weather'
			+ `?units=metric&lat=${lat}&lon=${lng}&APPID=${WEATHER_API}`);
		const weatherData = await res.json();

		if (weatherData.cod === 200) {
			this.setState({ weatherData, failed: false });
		} else {
			console.warn(
				weatherData.message ? weatherData.message : weatherData,
				lat, lng,
			);
			this.setState({ failed: true });
		}
	}

	render() {
		const { failed, weatherData } = this.state;

		if (!weatherData) return null;
		const weather = weatherData.weather[0];
		const { temp } = weatherData.main;

		return (
			<div className="weather-data" style={{ opacity: failed ? 0.2 : 1 }}>
				<img
					alt={weather.description} className="weather-data-icon"
					src={`http://openweathermap.org/img/w/${weather.icon}.png`}
					width={50} height={50}
				/>
				<p>{temp}{' °C'}</p>
			</div>
		);
	}
}

function renderWeather(pos: google.maps.LatLng, target: HTMLElement): void {
	render(createElement(WeatherDisplay, {
		lat: pos.lat(),
		lng: pos.lng(),
		delay: 5000,
	}), target);
}

/**
 * Attaches the weather component to the given Google Map,
 * and updates itself when the map moves so the weather reflects
 * the current focus of the map.
 * @param map
 * @param element on document to place map
 * @returns call to remove listener
 */
export default function observeMap(map: google.maps.Map, element: HTMLElement) {
	renderWeather(map.getCenter(), element);

	const listener = google.maps.event.addListener(map, 'center_changed',
		() => renderWeather(map.getCenter(), element)
	);

	return () => listener.remove();
}
