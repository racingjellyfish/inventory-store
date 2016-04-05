import * as BatchActions from '../actions/Batch';
import BatchListComponent from '../components/BatchList';
import { connect } from 'react-redux';

const getVisibleBatches = (batches, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return batches;
		case 'SHOW_FULL':
			return batches.filter((batch) => batch !== undefined);
		case 'SHOW_EMPTY':
			return batches.filter((batch) => batch === undefined);
	}
};

const mapStateToProps = (state) => {
	return {
		batches: getVisibleBatches(state.get('batches'), 'SHOW_ALL')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onBatchClick: (id) => {
			dispatch(BatchActions.drink(id));
		}
	};
};

const FilteredBatchList = connect(
	mapStateToProps,
	mapDispatchToProps
)(BatchListComponent);

export default FilteredBatchList;
