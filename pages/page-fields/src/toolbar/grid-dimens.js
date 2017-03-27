import { createElement, PropTypes, PureComponent } from 'react';
/** @jsx createElement */
import { MenuGroup } from 'ribbon-toolbar';

export default class GridDimensInputs extends PureComponent {
	static get propTypes() {
		return {
			angle: PropTypes.number,
			baseWidth: PropTypes.number,
			baseHeight: PropTypes.number,
			onBlur: PropTypes.func.isRequired,
		};
	}

	static get defaultProps() {
		return { angle: 0, baseWidth: 2, baseHeight: 2 };
	}

	constructor(props) {
		super(props);

		this.state = {
			handleBlur: {
				angle: this.handleBlur.bind('angle'),
				baseWidth: this.handleBlur.bind('baseWidth'),
				baseHeight: this.handleBlur.bind('baseHeight'),
			},
		};
	}

	handleBlur(field, event) {
		const copy = Object.assign({}, this.props);
		const { onBlur } = copy; Reflect.deleteProperty(copy, 'onBlur');

		copy[field] = event.target.value;
		onBlur(copy);
	}

	render() {
		const { angle, baseWidth, baseHeight } = this.props;
		const { handleBlur } = this.state;

		return (
			<MenuGroup title="Grid Dimesions">
				<div className="grid-dimen-container">
					<span className="grid-dimen-icon angle-dial">
						<span
							className="angle-dial-line"
							style={{ transform: `rotate(${angle}deg)` }}
						/>
					</span>
					<label htmlFor="grid-dimen-angle">Angle</label>
					<input
						className="grid-dimen-input" id="grid-dimen-angle"
						type="number" min={0} max={360} step="any"
						onBlur={handleBlur.angle} value={angle}
					/>
				</div>
				<div className="grid-dimen-container">
					<span className="grid-dimen-icon material-icons md-18">
						border_bottom
					</span>
					<label htmlFor="grid-dimen-width">Width</label>
					<input
						className="grid-dimen-input" id="grid-dimen-width"
						type="number" min={0} step="any"
						onBlur={handleBlur.baseWidth} value={baseWidth}
					/>
				</div>
				<div className="grid-dimen-container">
					<span className="grid-dimen-icon material-icons md-18">
						border_left
					</span>
					<label htmlFor="grid-dimen-height">Height</label>
					<input
						className="grid-dimen-input" id="grid-dimen-height"
						type="number" min={0} step="any"
						onBlur={handleBlur.baseHeight} value={baseHeight}
					/>
				</div>
			</MenuGroup>
		);
	}
}
