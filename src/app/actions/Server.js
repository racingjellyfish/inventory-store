import * as ActionTypes from '../constants/ActionTypes';

/**
 * server related actions
 */
export function receiveData(json) {
	return {
		type: ActionTypes.RECEIVE_DATA,
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
