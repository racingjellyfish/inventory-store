import * as BottleActions from '../actions/Bottle';
import BottleList from '../components/BottleList';
import { connect } from 'react-redux';

const getVisibleBottles = (bottles, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return bottles;
		case 'SHOW_FULL':
			return bottles.filter((bottle) => bottle.batchId !== undefined);
		case 'SHOW_EMPTY':
			return bottles.filter((bottle) => bottle.batchId === undefined);
	}
};

const mapStateToProps = (state) => {
	return {
		bottles: getVisibleBottles(state.get('bottles'), 'SHOW_ALL')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onBottleClick: (id) => {
			dispatch(BottleActions.drink(id));
		}
	};
};

const VisibleBottleList = connect(
	mapStateToProps,
	mapDispatchToProps
)(BottleList);

export default VisibleBottleList;
