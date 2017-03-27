import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeView, backDate, nextDate, goToToday } from '../redux/actions';
import { getDate } from '../redux/selectors.js';
import { viewNames } from '../utils/propTypes.js';

function firstLetterCaps(word) {
	return word.slice(0, 1).toUpperCase() + word.slice(1);
}


const Toolbar = ({
	view: currentView, views, title,
	onBackPressed, onNextPressed,
	onTodayPressed,
	onViewPressed,
}) => (
	<header className="cal-tb-container">
		<button type="button" onClick={onBackPressed} className="cal-tb-back-btn">
			{'<'}
		</button>
		<button type="button" onClick={onNextPressed} className="cal-tb-next-btn">
			{'>'}
		</button>
		<button type="button" onClick={onTodayPressed} className="cal-tb-today-btn">
			Today
		</button>

		<h2 className="cal-tb-title">{title}</h2>

		{views.map(view => (
			<button
				type="button" className="cal-tb-view-btn"
				onClick={onViewPressed.bind(null, view)}
				aria-pressed={(view === currentView).toString()}
			>
				{firstLetterCaps(view)}
			</button>
		))}
	</header>
);

Toolbar.propTypes = {
	date: PropTypes.instanceOf(moment).isRequired,
	view: PropTypes.oneOf(...viewNames).isRequired,
	views: PropTypes.arrayOf(PropTypes.oneOf(...viewNames)),
	title: PropTypes.string,
	onBackPressed: PropTypes.func.isRequired,
	onNextPressed: PropTypes.func.isRequired,
	onTodayPressed: PropTypes.func.isRequired,
	onViewPressed: PropTypes.func.isRequired,
};

Toolbar.defaultProps = {
	views: ['month', 'week', 'day', 'agenda'],
};


const ConnectedToolbar = connect(
	(state, { view }) => {
		const date = getDate(date);

		let title;
		switch (view) {
			case 'month': title = date.format('MMMM Y'); break;
			case 'day': title = date.format('MMMM D, Y'); break;
			case 'week': {
				const start = date.clone().startOf('week');
				const end = date.clone().endOf('week');
				title = start.isSame(end, 'year')
					? `${start.format('MMM D')} - ${end.format('MMM D, Y')}}`
					: `${start.format('MMM D', Y)} - ${end.format('MMM D, Y')}}`;
				break;
			}
			case 'agenda': {
				const end = date.clone().add(1, 'week');
				title = date.isSame(end, 'year')
					? `${date.format('MMM D')} - ${end.format('MMM D, Y')}}`
					: `${date.format('MMM D', Y)} - ${end.format('MMM D, Y')}}`;
				break;
			}
		}
		return { title };
	},
	dispatch => bindActionCreators({
		onBackPressed: backDate,
		onNextPressed: nextDate,
		onTodayPressed: goToToday,
		onViewPressed: changeView,
	}, dispatch),
)(Toolbar);


export {
	ConnectedToolbar as default,
	Toolbar,
};
