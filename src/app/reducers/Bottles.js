import * as ActionTypes from '../constants/ActionTypes';
import { Bottle } from '../entities/Bottle';
import { InventoryState } from '../entities/InventoryState';

const initialState = new InventoryState();

export function bottles(state = initialState.get('bottles'), action) {
	switch (action.type) {
		case ActionTypes.ADD_BOTTLE:
			return state.push(Bottle.create(action.payload.bottleId,
				action.payload.type,
				action.payload.volume
			));

		case ActionTypes.DATA_REQUEST_SUCCESS:
			return readBottleData(state, action.payload.json);

		case ActionTypes.DELETE_ITEM_REQUEST:
			if (action.meta.type !== 'bottle') {
				return state;
			}
			return updateBottleStatus(state, action.meta.id, 'DELETING');

		case ActionTypes.DELETE_ITEM_RESPONSE:
			if (action.meta.type !== 'bottle') {
				return state;
			}
			if (action.error) {
				console.error('problems deleting bottle: ' + action.meta.id + '\n\tdue to: ' + action.payload);
				return updateBottleStatus(state, action.meta.id, 'OK');
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
};

function updateBottleStatus(state, bottleId, status) {
	return state.map((bottle) => {
		if (bottle.get('id') === bottleId) {
			bottle = bottle.set('status', status);
		}
		return bottle;
	});
}
