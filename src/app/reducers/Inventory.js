import * as ActionTypes from '../constants/ActionTypes';
import { Batch } from '../entities/Batch';
import { Bottle } from '../entities/Bottle';
import { combineReducers } from 'redux-immutable';
import { InventoryState } from '../entities/InventoryState';
import { Map } from 'immutable';

const initialState = new InventoryState();

function batches(state = initialState.get('batches'), action) {
	switch (action.type) {
		case ActionTypes.ADD_BATCH:
			return state.set(action.payload.batchId,
				Batch.create(action.payload.batchId, action.payload.batchName));

		case ActionTypes.DATA_REQUEST_SUCCESS:
			const batchData = action.payload.json.batches;
			return state.withMutations((batchList) => {
				batchData.forEach((batchJson) => {
					batchList.push(Batch.fromJson(batchJson));
				});
			});

		default:
			return state;
	}
};

function bottles(state = initialState.get('bottles'), action) {
	switch (action.type) {
		case ActionTypes.ADD_BOTTLE:
			return state.push(Bottle.create(action.payload.bottleId,
				action.payload.type,
				action.payload.volume
			));

		case ActionTypes.REMOVE_BOTTLE:
			return state.filter((bottle) => {
				return bottle.get('id') !== action.payload.bottleId;
			});

		case ActionTypes.DATA_REQUEST_SUCCESS:
			const bottleData = action.payload.json.bottles;
			return state.withMutations((bottleList) => {
				bottleData.forEach((bottleJson) => {
					console.log('bottle json: ' + bottleJson);
					bottleList.push(Bottle.fromJson(bottleJson));
				});
			});

		default:
			return state;
	}
};

function bottleToBatchLookup(state = initialState.get('bottleToBatchLookup'), action) {
	switch (action.type) {
		case ActionTypes.DRINK_BOTTLE:
			return state.delete(action.payload.bottleId);

		case ActionTypes.FILL_BOTTLE:
			return state.set(action.payload.bottleId, action.payload.batchId);

		default:
			return state;
	}
};

function serverState(state = initialState.get('serverState'), action) {
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
