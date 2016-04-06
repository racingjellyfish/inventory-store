import * as BatchActions from '../actions/Batch';
import BatchComponent from '../components/Batch';
import { connect } from 'react-redux';

const getBottleCount = (state, batch) => {
	const batchId = batch.get('id');
	const bottleToBatchLookup = state.get('bottleToBatchLookup');
	return bottleToBatchLookup.reduce((bottleCount, bottleToBatch) => {
		return bottleToBatch === batchId ? ++bottleCount : bottleCount;
	}, 0);
};

const mapStateToProps = (state, ownProps) => {
	const batch = ownProps.batch;
	return {
		batch: batch,
		count: getBottleCount(state, batch)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDelete: (id) => {
			dispatch(BatchActions.remove(id));
		},
		onDrink: (id) => {
			dispatch(BatchActions.drink(id));
		}
	};
};

const Batch = connect(
	mapStateToProps,
	mapDispatchToProps
)(BatchComponent);

export default Batch;
