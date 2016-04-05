import * as ActionTypes from '../constants/ActionTypes';
import { Batch } from '../entities/Batch';
import { Bottle } from '../entities/Bottle';
import { bottles } from './Bottles';
import { combineReducers } from 'redux-immutable';
import { InventoryState } from '../entities/InventoryState';
import { Map } from 'immutable';

const initialState = new InventoryState();

function batches(state = initialState.get('batches'), action) {
	// currently no custom error handling so just return the current state
	if (action.error) {
		return state;
	}

	switch (action.type) {
		case ActionTypes.ADD_BATCH:
			return state.set(action.payload.batchId,
				Batch.create(action.payload.batchId, action.payload.batchName));

		case ActionTypes.DATA_REQUEST_SUCCESS:
			const batchData = action.payload.json.batches;
			return state.clear().withMutations((batches) => {
				batchData.forEach((batchJson) => {
					batches.push(Batch.fromJson(batchJson));
				});
			});

		default:
			return state;
	}
};

function bottleToBatchLookup(state = initialState.get('bottleToBatchLookup'), action) {
	// currently no custom error handling so just return the current state
	if (action.error) {
		return state;
	}

	switch (action.type) {
		case ActionTypes.DATA_REQUEST_SUCCESS:
			return new Map(action.payload.json.bottleToBatchLookup);

		case ActionTypes.UPDATE_ITEM_RESPONSE:
			return new Map(action.payload.json.bottleToBatchLookup);

		default:
			return state;
	}
};

function serverState(state = initialState.get('serverState'), action) {
	// currently no custom error handling so just return the current state
	if (action.error) {
		return state;
	}

	switch (action.type) {
		case ActionTypes.REQUEST_DATA:
			return state.set('isFetching', true);

		case ActionTypes.DATA_REQUEST_SUCCESS:
			return state.set('isFetching', false);

		default:
			return state;
	}
};

const Inventory = combineReducers({
	batches,
	bottles,
	bottleToBatchLookup,
	serverState
});

export default Inventory;
