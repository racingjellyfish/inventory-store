import * as ActionTypes from '../constants/ActionTypes';
import { Batch, Bottle, BottleFromJson } from '../entities/Entities';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { InventoryState } from '../entities/InventoryState';

const initialState = new InventoryState();

function batches(state = initialState.get('batches'), action) {
	switch (action.type) {
		case ActionTypes.ADD_BATCH:
			return state.set(action.payload.batchId,
				Batch(action.payload.batchId, action.payload.batchName));

		case ActionTypes.RECEIVE_DATA:
			const updates = JSON.parse(action.payload.json);
			return state.withMutations(map => {
				updates.batches.forEach((batch) => {
					map.set(batch.id, Map(batch));
				})
			});

		default:
			return state;
	}
};

function bottles(state = initialState.get('bottles'), action) {
	switch (action.type) {
		case ActionTypes.ADD_BOTTLE:
			return state.push(Bottle(action.payload.bottleId));

		case ActionTypes.REMOVE_BOTTLE:
			return state.filter((bottle) => {
				return bottle.get('id') !== action.payload.bottleId;
			});

		case ActionTypes.RECEIVE_DATA:
			const updates = JSON.parse(action.payload.json);
			return state.withMutations(map => {
				updates.bottles.forEach((bottle) => {
					map.set(bottle.id, BottleFromJson(bottle));
				})
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

		case ActionTypes.RECEIVE_DATA:
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
