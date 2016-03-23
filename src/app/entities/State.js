import { Map } from 'immutable';

function convertToMap(arrayOfImmutable) {
	let mapOfImmutable = Map();
	arrayOfImmutable.forEach((immutableObject) => {
		mapOfImmutable = mapOfImmutable.set(immutableObject.get('id'), immutableObject);
	});
	return mapOfImmutable;
};

export function State(batches = [], bottles = [], isFetching = false) {
	return Map({
		data: Map({isFetching: isFetching}),
		batches: convertToMap(batches),
		bottles: convertToMap(bottles)
	});
};
