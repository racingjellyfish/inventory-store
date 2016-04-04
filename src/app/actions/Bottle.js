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

export function removeBottle(bottleId) {
	return {
		type: ActionTypes.REMOVE_BOTTLE,
		payload: {
			bottleId: bottleId
		}
	};
};

export function deleteBottle(bottleId) {
	return ServerActions.deleteItem({
		type: 'bottle',
		id: bottleId
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
