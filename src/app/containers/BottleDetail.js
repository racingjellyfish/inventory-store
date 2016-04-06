import * as BottleActions from '../actions/Bottle';
import BottleDetailComponent from '../components/BottleDetail';
import { connect } from 'react-redux';

const getContents = (state, bottle) => {
	let contents = 'empty';
	if (bottle) {
		const bottleId = bottle.get('id');
		const batchId = state.get('bottleToBatchLookup').get(bottleId);
		const batch = state.get('batches').get(batchId);
		contents = batch === undefined ? 'empty' : batch.get('name')
	}
	return contents;
};

const mapStateToProps = (state, ownProps) => {
	const bottleId = Number(ownProps.params.bottleId);
	const bottle = state.get('bottles').filter((bottle) => {
		return bottle.get('id') === bottleId;
	}).get(0);

	return {
		id: bottleId,
		isFetching: state.get('serverState').get('isFetching'),
		bottle: bottle,
		contents: getContents(state, bottle)
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

const BottleDetail = connect(
	mapStateToProps,
	mapDispatchToProps
)(BottleDetailComponent);

export default BottleDetail;
