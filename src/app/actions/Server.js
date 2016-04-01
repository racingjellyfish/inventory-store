import * as ActionTypes from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

/**
 * server related actions
 */
export function dataRequestFailure(error) {
	return {
		type: ActionTypes.DATA_REQUEST_FAILURE,
		error: true,
		payload: error
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

export function fetchData() {
	return function (dispatch) {
		// update app state to show that the API call has started
		dispatch(requestData());

		// return a promise that will be resolved/rejected when the API call completes
		return fetch('http://localhost:8080/data.json')
			.then((response) => {
				console.log('response: ' + response);
				const jsonData = response.json();
				console.log('json: ' + jsonData);
				return jsonData;
			})
			.then((json) => {
				dispatch(dataRequestSuccess(json));
			})
			.catch((error) => {
				dispatch(dataRequestFailure(error));
			});
	};
};

function shouldFetchData(state) {
	const bottles = state.get('bottles');
	if (state.get('serverState').get('isFetching')) {
		// a fetch is already in progress
		return false;
	} else if (bottles.size === 0) {
		// there are no bottles, or the data hasn't been fetched, either way request the data
		return true;
	} else {
		// TODO: allow user to force a data refresh
		//return state.serverState.refreshData;
		return false;
	}
};

export function fetchDataIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchData(getState())) {
			// need to fetch data so let calling code know
			return dispatch(fetchData());
		} else {
			// no fetch required so allow calling code to run through
			return Promise.resolve();
		}
	};
};
