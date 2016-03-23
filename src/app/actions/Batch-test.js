/**
 * basic UTs for batch related actions
 */
'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import * as Batch from './Batch';
import expect from 'expect';

describe('ActionCreator -', () => {

	describe('Batch -', () => {

		it('calling addBatch returns an action to add a batch', () => {
			expect(Batch.addBatch(0, 'beer-0')).toEqual({
				type: ActionTypes.ADD_BATCH,
				payload: {
					batchId: 0,
					batchName: 'beer-0'
				}
			});
		});
	});
});
