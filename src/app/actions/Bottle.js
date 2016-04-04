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

export function drink(id) {
	return ServerActions.updateItem({
		type: 'bottle',
		id: id,
		action: 'DRINKING'
	});
};

export function fill(id, batchId) {
	return ServerActions.updateItem({
		type: 'bottle',
		id: id,
		batchId: batchId,
		action: 'FILLING'
	});
};
