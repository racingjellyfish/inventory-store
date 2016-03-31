import { Map } from 'immutable';

export function Batch(id, name) {
	return Map({
		id: id,
		name: name
	});
};

export function Bottle(id) {
	return Map({
		id: id
	});
};

export function BottleFromJson(jsonData) {
	return Map({
		id: jsonData.id
	});
};
