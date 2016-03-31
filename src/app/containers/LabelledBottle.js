import * as BottleActions from '../actions/Bottle';
import Bottle from '../components/Bottle';
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
		contents: getContents(state, bottle)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: (id) => {
			dispatch(BottleActions.drink(id));
		}
	};
};

const LabelledBottle = connect(
	mapStateToProps,
	mapDispatchToProps
)(Bottle);

export default LabelledBottle;
