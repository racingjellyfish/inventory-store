import * as BottleActions from '../actions/Bottle';
import BottleDetailComponent from '../components/BottleDetail';
import { connect } from 'react-redux';

const getContents = (state, bottle) => {
	let contents;
	if (bottle) {
		const bottleId = bottle.get('id');
		const batchId = state.get('bottleToBatchLookup').get(bottleId);
		const batch = state.get('batches').get(batchId);
		contents = batch === undefined ? 'empty' : batch.get('name')
	} else {
		contents = 'empty';
	}
	return contents;
};

const mapStateToProps = (state, ownProps) => {
	// nothing to show if the app is still fetching the data
	// TODO: can this be avoided?
	if (state.get('serverState').get('isFetching')) {
		return {
			isFetching: true
		}
	}

	const bottleId = Number(ownProps.params.bottleId);
	const bottle = state.get('bottles').filter((bottle) => {
		return bottle.get('id') === bottleId;
	}).get(0);

	if (bottle) {
		return {
			id: bottleId,
			contents: getContents(state, bottle),
			status: bottle.get('status') || 'OK',
			type: bottle.get('type'),
			volume: bottle.get('volume')
		};
	}
	return {
		id: bottleId,
		status: 'UNKNOWN'
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
