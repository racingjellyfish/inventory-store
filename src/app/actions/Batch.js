import * as ActionTypes from '../constants/ActionTypes';

/**
 * batch related actions
 */
export function addBatch(batchId, batchName) {
	return {
		type: ActionTypes.ADD_BATCH,
		payload: {
			batchId: batchId,
			batchName: batchName
		}
	};
};
