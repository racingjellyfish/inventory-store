import * as BatchActions from '../actions/Batch';
import Batch from '../components/Batch';
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
		id: batch.get('id'),
		name: batch.get('name'),
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

const LabelledBatch = connect(
	mapStateToProps,
	mapDispatchToProps
)(Batch);

export default LabelledBatch;
