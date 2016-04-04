import * as ActionTypes from '../constants/ActionTypes';
import * as ServerActions from './Server';

/**
 * bottle related actions
 */
export function addBottle(bottleId) {
	return {
		type: ActionTypes.ADD_BOTTLE,
		payload: {
			bottleId: bottleId
		}
	};
};

export function remove(id) {
	return ServerActions.deleteItem({
		type: 'bottle',
		id: id
	});
};

export function fill(bottleId, batchId) {
	return {
		type: ActionTypes.FILL_BOTTLE,
		payload: {
			bottleId: bottleId,
			batchId: batchId
		}
	};
};

export function drink(bottleId) {
	return {
		type: ActionTypes.DRINK_BOTTLE,
		payload: {
			bottleId: bottleId
		}
	};
};
