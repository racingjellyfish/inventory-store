/**
 * basic UTs for server related actions
 */
'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import * as Server from './Server';
import expect from 'expect';

describe('ActionCreator -', () => {

	describe('Server -', () => {

		it('calling dataRequestSuccess returns an action for a successful data request', () => {
			const jsonData = {'jsonData': 0};

			expect(Server.dataRequestSuccess(jsonData)).toEqual({
				type: ActionTypes.DATA_REQUEST_SUCCESS,
				payload: {
					json: jsonData
				}
			});
		});

		it('calling dataRequestFailure returns an action for a failed data request', () => {
			expect(Server.dataRequestFailure(new Error('request failed'))).toEqual({
				type: ActionTypes.DATA_REQUEST_FAILURE,
				error: true,
				payload: new Error('request failed')
			});
		});

		it('calling requestData returns an action to request data', () => {
			expect(Server.requestData()).toEqual({
				type: ActionTypes.REQUEST_DATA
			});
		});
	});
});
