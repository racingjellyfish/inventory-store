import * as BottleActions from '../actions/Bottle';
import Bottle from '../components/Bottle';
import { connect } from 'react-redux';

const getContents = (batches, bottle) => {
	const batchId = bottle.get('batchId');
	const batch = batches.get(String(batchId));
	return batch === undefined ? 'empty' : batch.get('name');
};

const mapStateToProps = (state, ownProps) => {
	const bottle = ownProps.bottle;
	return {
		bottle: bottle,
		contents: getContents(state.get('batches'), bottle)
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
