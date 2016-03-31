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
	static create(batches = defaultBatches, bottles = defaultBottles,
			bottleToBatchLookup = defaultBottleToBatchLookup,
			serverState = defaultServerState) {

		return new InventoryState({
			batches: new List(batches),
			bottles: new List(bottles),
			bottleToBatchLookup: new Map(bottleToBatchLookup),
			serverState: new Map(serverState)
		});
	}
};
