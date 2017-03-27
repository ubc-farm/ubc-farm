import { createElement as h, PropTypes } from 'react'; /** @jsx h */

const AngleDial = ({ angle }) => (
	<span className="circle angle-indicator">
		<div
			className="angle-indicator-dial"
			style={{ transform: `rotate(${angle}deg)` }}
		/>
	</span>
);

AngleDial.propTypes = {
	angle: PropTypes.number.isRequired,
};

export default AngleDial;
