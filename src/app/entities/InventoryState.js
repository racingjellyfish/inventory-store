import { List, Map, Record } from 'immutable';

const defaultBatches = [];
const defaultBottles = [];
const defaultBottleToBatchLookup = [];
const defaultServerState = {
	isFetching: false
};
const defaultState = {
	batches: new List(defaultBatches),
	bottles: new List(defaultBottles),
	bottleToBatchLookup: new Map(defaultBottleToBatchLookup),
	serverState: new Map(defaultServerState)
};

export class InventoryState extends Record(defaultState) {
	static create(batches, bottles, bottleToBatchLookup, serverState) {

		return new InventoryState({
			batches: new List(batches || defaultBatches),
			bottles: new List(bottles || defaultBottles),
			bottleToBatchLookup: new Map(bottleToBatchLookup || defaultBottleToBatchLookup),
			serverState: new Map(serverState || defaultServerState)
		});
	}
};
