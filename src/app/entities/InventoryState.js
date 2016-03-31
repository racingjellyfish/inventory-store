import { Map, Record } from 'immutable';

const defaultBatches = [];
const defaultBottles = [];
const defaultServerState = {
	isFetching: false
};
const defaultState = {
	batches: convertToMap(defaultBatches),
	bottles: convertToMap(defaultBottles),
	serverState: new Map(defaultServerState)
};

function convertToMap(arrayOfImmutable) {
	let mapOfImmutable = new Map();
	arrayOfImmutable.forEach((immutableObject) => {
		mapOfImmutable = mapOfImmutable.set(immutableObject.get('id'), immutableObject);
	});
	return mapOfImmutable;
};

export class InventoryState extends Record(defaultState) {
	static create(batches = defaultBatches, bottles = defaultBottles, serverState = defaultServerState) {
		return new InventoryState({
			batches: convertToMap(batches),
			bottles: convertToMap(bottles),
			serverState: new Map(serverState)
		});
	}
};
