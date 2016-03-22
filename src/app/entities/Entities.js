import { fromJS } from 'immutable';

export function Batch(id, name) {
	return fromJS({
		id: id,
		name: name
	});
};

export function Bottle(id, batchId) {
	return fromJS({
		id: id,
		batchId: batchId
	});
};
