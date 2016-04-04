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

export function deleteBottle(bottleId) {
	return function (dispatch) {
		// update app state to show that the API call has started
		dispatch(requestBottleRemoval(bottleId));

		// return a promise that will be resolved/rejected when the API call completes
		return fetch('/api/bottle', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "DELETE",
				body: JSON.stringify({id: bottleId})
			}).then((response) => {
				return response.json();
			}).then((json) => {
				dispatch(bottleRemovalSuccess(json));
			}).catch((error) => {
				dispatch(bottleRemovalFailure(error));
			});
	};
};

function requestBottleRemoval(bottleId) {
	return {
		type: ActionTypes.REMOVE_ITEM_REQUEST,
		payload: {
			id: bottleId,
			type: 'bottle'
		}
	};
};

export function bottleRemovalFailure(error) {
	return {
		type: ActionTypes.BOTTLE_REMOVAL_FAILURE,
		error: true,
		payload: error
	};
};

export function bottleRemovalSuccess(json) {
	return {
		type: ActionTypes.BOTTLE_REMOVAL_SUCCESS,
		payload: {
			json: json
			// ,
			// receivedAt: Date.now()
		}
	};
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
