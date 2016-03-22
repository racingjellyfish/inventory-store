import * as ActionTypes from '../constants/ActionTypes';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

const initialState = {
	batches: {},
	bottles: {}
};

function batches(state = Immutable.Map(initialState.batches), action) {
	switch (action.type) {
		case ActionTypes.ADD_BATCH:
			const newBatch = Immutable.fromJS({
						id: action.payload.batchId,
						name: action.payload.batchName
					});
			return state.set(String(action.payload.batchId), newBatch);

		default:
			return state;
	}
};

function bottles(state = Immutable.Map(initialState.bottles), action) {
	switch (action.type) {
		case ActionTypes.ADD_BOTTLE:
			const newBottle = Immutable.fromJS({
						id: action.payload.bottleId
					});
			return state.set(String(action.payload.bottleId), newBottle);

		case ActionTypes.REMOVE_BOTTLE:
			return state.delete(String(action.payload.bottleId));

		case ActionTypes.FILL_BOTTLE:
			const filledBottle = Immutable.fromJS({
						id: action.payload.bottleId,
						batch: action.payload.batchId
					});
			return state.set(String(action.payload.bottleId), filledBottle);

		default:
			return state;
	}
};

const Inventory = combineReducers({
	batches,
	bottles
});

export default Inventory;
