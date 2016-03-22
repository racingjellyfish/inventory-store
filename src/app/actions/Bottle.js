import * as ActionTypes from '../constants/ActionTypes';

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