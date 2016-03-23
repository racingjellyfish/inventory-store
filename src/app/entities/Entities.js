import { Map } from 'immutable';

export function Batch(id, name) {
	return Map({
		id: id,
		name: name
	});
};

export function Bottle(id, batchId) {
	return Map({
		id: id,
		batchId: batchId
	});
};

export function BottleFromJson(jsonData) {
	return Map({
		id: jsonData.id,
		batchId: jsonData.batchId
	});
};
