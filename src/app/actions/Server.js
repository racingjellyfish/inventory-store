import * as ActionTypes from '../constants/ActionTypes';

/**
 * server related actions
 */
export function dataRequestFailure(errorMsg) {
	return {
		type: ActionTypes.DATA_REQUEST_FAILURE,
		error: true,
		payload: new Error(errorMsg)
	};
};

export function dataRequestSuccess(json) {
	return {
		type: ActionTypes.DATA_REQUEST_SUCCESS,
		payload: {
			json: json
			// ,
			// receivedAt: Date.now()
		}
	};
};

export function requestData() {
	return {
		type: ActionTypes.REQUEST_DATA
	};
};
