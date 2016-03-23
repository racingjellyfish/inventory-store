/**
 * basic UTs for server related actions
 */
'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import * as Server from './Server';
import expect from 'expect';

describe('ActionCreator -', () => {

	describe('Server -', () => {

		it('calling receiveData returns an action to receive data', () => {
			const jsonData = {"jsonData": 0};

			expect(Server.receiveData(jsonData)).toEqual({
				type: ActionTypes.RECEIVE_DATA,
				payload: {
					json: jsonData
				}
			});
		});

		it('calling requestData returns an action to request data', () => {
			expect(Server.requestData()).toEqual({
				type: ActionTypes.REQUEST_DATA
			});
		});
	});
});
