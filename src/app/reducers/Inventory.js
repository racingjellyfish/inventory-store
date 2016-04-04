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
			return state.clear().withMutations((batches) => {
				batchData.forEach((batchJson) => {
					batches.push(Batch.fromJson(batchJson));
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
			return readBottleData(state, action.payload.json);

		case ActionTypes.DELETE_ITEM_REQUEST:
			if (action.meta.type !== 'bottle') {
				return state;
			}
			return state.map((bottle) => {
				if (bottle.get('id') === action.meta.id) {
					bottle = bottle.set('deleting', true);
				}
				return bottle;
			});

		case ActionTypes.DELETE_ITEM_RESPONSE:
			if (action.meta.type !== 'bottle') {
				return state;
			}
			if (action.error) {
				return state.map((bottle) => {
					if (bottle.get('id') === action.meta.id) {
						bottle = bottle.set('deleting', false);
					}
					return bottle;
				});
			}
			return readBottleData(state, action.payload.json);

		default:
			return state;
	}
};

function readBottleData(state, jsonData) {
	const bottlesData = jsonData.bottles;
	return state.clear().withMutations((bottles) => {
		bottlesData.forEach((bottleJson) => {
			bottles.push(Bottle.fromJson(bottleJson));
		});
	});
}

function bottleToBatchLookup(state = initialState.get('bottleToBatchLookup'), action) {
	switch (action.type) {
		case ActionTypes.DRINK_BOTTLE:
			// TODO: throw error if already empty?
			return state.delete(action.payload.bottleId);

		case ActionTypes.FILL_BOTTLE:
			// TODO: throw error if already full?
			return state.set(action.payload.bottleId, action.payload.batchId);

		case ActionTypes.DATA_REQUEST_SUCCESS:
			return new Map(action.payload.json.bottleToBatchLookup);

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
