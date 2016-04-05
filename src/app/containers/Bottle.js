import * as BottleActions from '../actions/Bottle';
import BottleComponent from '../components/Bottle';
import { connect } from 'react-redux';

const getContents = (state, bottle) => {
	const bottleId = bottle.get('id');
	const batchId = state.get('bottleToBatchLookup').get(bottleId);
	const batch = state.get('batches').get(batchId);
	return batch === undefined ? 'empty' : batch.get('name');
};

const mapStateToProps = (state, ownProps) => {
	const bottle = ownProps.bottle;
	return {
		id: bottle.get('id'),
		contents: getContents(state, bottle),
		status: bottle.get('status') || 'OK'
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDelete: (id) => {
			dispatch(BottleActions.remove(id));
		},
		onDrink: (id) => {
			dispatch(BottleActions.drink(id));
		}
	};
};

const Bottle = connect(
	mapStateToProps,
	mapDispatchToProps
)(BottleComponent);

export default Bottle;
