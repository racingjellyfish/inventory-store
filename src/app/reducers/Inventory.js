import * as ActionTypes from '../constants/ActionTypes';
import { Batch, Bottle } from '../entities/Entities';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { State } from '../entities/State';

const initialState = State();

function batches(state = initialState.get('batches'), action) {
	switch (action.type) {
		case ActionTypes.ADD_BATCH:
			return state.set(action.payload.batchId,
				Batch(action.payload.batchId, action.payload.batchName));

		default:
			return state;
	}
};

function bottles(state = initialState.get('bottles'), action) {
	switch (action.type) {
		case ActionTypes.ADD_BOTTLE:
			return state.set(action.payload.bottleId,
				Bottle(action.payload.bottleId));

		case ActionTypes.REMOVE_BOTTLE:
			return state.filter((bottle) => {
				return bottle.get('id') !== action.payload.bottleId;
			});

		case ActionTypes.FILL_BOTTLE:
			return state.setIn([action.payload.bottleId, 'batchId'],
				action.payload.batchId);

		case ActionTypes.DRINK_BOTTLE:
			return state.setIn([action.payload.bottleId, 'batchId'],
				undefined);

		default:
			return state;
	}
};

const Inventory = combineReducers({
	batches,
	bottles
});

export default Inventory;
