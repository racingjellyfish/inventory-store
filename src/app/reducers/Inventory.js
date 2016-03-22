import * as ActionTypes from '../constants/ActionTypes';
import {Batch, Bottle} from '../entities/Entities';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { State } from '../entities/State';

const initialState = State();

function batches(state = Immutable.Map(initialState.batches), action) {
	switch (action.type) {
		case ActionTypes.ADD_BATCH:
			return state.set(String(action.payload.batchId),
				Batch(action.payload.batchId, action.payload.batchName));

		default:
			return state;
	}
};

function bottles(state = Immutable.Map(initialState.bottles), action) {
	switch (action.type) {
		case ActionTypes.ADD_BOTTLE:
			return state.set(String(action.payload.bottleId),
				Bottle(action.payload.bottleId));

		case ActionTypes.REMOVE_BOTTLE:
			return state.delete(String(action.payload.bottleId));

		case ActionTypes.FILL_BOTTLE:
			return state.set(String(action.payload.bottleId),
				Bottle(action.payload.bottleId, action.payload.batchId));

		default:
			return state;
	}
};

const Inventory = combineReducers({
	batches,
	bottles
});

export default Inventory;
