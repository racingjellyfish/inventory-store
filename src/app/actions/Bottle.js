import * as ActionTypes from '../constants/ActionTypes';
import * as BottleConstants from '../constants/Bottle';
import * as ServerActions from './Server';

/*
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
		type: BottleConstants.TYPE,
		id: id
	});
};

export function drink(id) {
	return ServerActions.updateItem({
		type: BottleConstants.TYPE,
		id: id,
		action: ActionTypes.DRINK
	});
};

export function fill(id, batchId) {
	return ServerActions.updateItem({
		type: BottleConstants.TYPE,
		id: id,
		batchId: batchId,
		action: ActionTypes.FILL
	});
};
