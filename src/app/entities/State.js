import { Map } from 'immutable';

function convertToMap(arrayOfImmutable) {
	let mapOfImmutable = Map();
	arrayOfImmutable.forEach((immutableObject) => {
		mapOfImmutable = mapOfImmutable.set(immutableObject.get('id'), immutableObject);
	});
	return mapOfImmutable;
};

export function State(batches, bottles) {
	return Map({
		batches: convertToMap(batches || []),
		bottles: convertToMap(bottles || [])
	});
};
