import {connect} from 'react-redux';
import {setViewingDate} from '../redux/actions.js';
import AgendaList from './list.js';

export default connect(
	state => ({
		today: state.today
	}),
	(dispatch, {date}) => ({
		onHeaderClick() { dispatch(setViewingDate(date));	}
	})
)(AgendaList);