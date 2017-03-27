import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { currentLoadingSelector } from '../redux/selectors.js';
import LoadingIndicator from './loading-indicator.js';

const SubmitForm = ({ form, loading, disabled }) => (
	<section>
		<LoadingIndicator hidden={!loading} />
		<button
			form={form} type="submit"
			disabled={loading || disabled}
		>
			<i className="material-icons">keyboard_arrow_right</i>
			Update Grid
		</button>
	</section>
);

SubmitForm.propTypes = {
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	form: PropTypes.string,
};

export default connect(
	state => ({ loading: currentLoadingSelector(state) })
)(SubmitForm);
