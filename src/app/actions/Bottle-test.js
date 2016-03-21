/**
 * basic UTs for the root component
 */
'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import * as Bottle from '../actions/Bottle';
import expect from 'expect';

describe('ActionCreator -', () => {

	describe('Bottle -', () => {

		it('calling addBottle returns an action to add a bottle', () => {
			expect(Bottle.addBottle(0)).toEqual({
				type: ActionTypes.ADD_BOTTLE,
				payload: {
					bottleId: 0
				}
			});
		});

		it('calling removeBottle returns an action to remove a bottle', () => {
			expect(Bottle.removeBottle(1)).toEqual({
				type: ActionTypes.REMOVE_BOTTLE,
				payload: {
					bottleId: 1
				}
			});
		});
	});
});
