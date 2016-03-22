import { fromJS } from 'immutable';

function convertToMap(arrayOfImmutable) {
	const mapOfImmutable = {};
	arrayOfImmutable.forEach((immutableObject) => {
		mapOfImmutable[immutableObject.get('id')] = immutableObject;
	});
	return fromJS(mapOfImmutable);
};

export function State(batches, bottles) {
	return fromJS({
		batches: convertToMap(batches || []),
		bottles: convertToMap(bottles || [])
	});
};
