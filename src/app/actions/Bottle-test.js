/**
 * basic UTs for bottle related actions
 */
'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import * as Bottle from './Bottle';
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

		it('calling drink returns an action to drink a bottle', () => {
			expect(Bottle.drink(1)).toEqual({
				type: ActionTypes.DRINK_BOTTLE,
				payload: {
					bottleId: 1
				}
			});
		});

		it('calling fill returns an action to fill a bottle', () => {
			expect(Bottle.fill(2, 0)).toEqual({
				type: ActionTypes.FILL_BOTTLE,
				payload: {
					bottleId: 2,
					batchId: 0
				}
			});
		});

		it('calling removeBottle returns an action to remove a bottle', () => {
			expect(Bottle.removeBottle(3)).toEqual({
				type: ActionTypes.REMOVE_BOTTLE,
				payload: {
					bottleId: 3
				}
			});
		});
	});
});
