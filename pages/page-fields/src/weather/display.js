import { createElement as h, PureComponent, PropTypes } from 'react';
/** @jsx h */

/** @todo use rollup to replace with env variable */
const WEATHER_API = '84c885cba4b86046e2e6f506d2f86a09'; // process.env.WEATHER_API

/**
 * Displays weather data pulled from OpenWeatherMap.
 * The provided position is used to find weather data.
 */
export default class WeatherDisplay extends PureComponent {
	static get propTypes() {
		return {
			lat: PropTypes.number.isRequired,
			lng: PropTypes.number.isRequired,
			delay: PropTypes.number,
		};
	}

	static get defaultProps() {
		return {
			delay: 1000,
		};
	}

	constructor(props) {
		super(props);

		this.state = { weather: undefined, timestamp: Date.now(), failed: false };
		this.updateWeatherState();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props)	{
			const now = Date.now();
			if (now - this.state.timestamp > this.props.delay) {
				this.setState({ timestamp: now });
				this.updateWeatherState(nextProps);
			}
		}
	}

	updateWeatherState({ lat, lng } = this.props) {
		return fetch('http://api.openweathermap.org/data/2.5/weather?units=metric'
		+ `&lat=${lat}&lon=${lng}`
		+ `&APPID=${WEATHER_API}`)
		.then(response => response.json())
		.then(json => {
			if (json.cod === 200) this.setState({ weather: json, failed: false });
			else {
				console.warn(json.message ? json.message : json, lat, lng);
				this.setState({ failed: true });
			}
		});
	}

	render() {
		const { failed, weather: weatherData } = this.state;

		if (!weatherData) return null;
		const { weather: [weather], main: { temp } } = weatherData;

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
