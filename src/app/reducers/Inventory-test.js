import * as Bottle from '../actions/Bottle';
import expect from 'expect';
import Immutable from 'immutable';
import Inventory from './Inventory';

describe('Reducer -', () => {
	const initialState = Immutable.fromJS({
		batches: {},
		bottles: {}
	});

	describe('Inventory -', () => {

		it('should return the initial state', () => {
			expect(Immutable.is(Inventory(undefined, {}), initialState)).toBe(true);
		});

		it('should add a bottle', () => {
			const updatedState = Inventory(initialState, Bottle.addBottle(0));
			const expectedState = Immutable.fromJS({
				batches: {},
				bottles: {
					0: {
						id: 0
					}
				}
			});

			checkEquality(updatedState, expectedState);
		});

		it('should remove a bottle', () => {
			const state = Immutable.fromJS({
				batches: {},
				bottles: {
					0: {
						id: 0
					},
					1: {
						id: 1
					}
				}
			});
			const updatedState = Inventory(state, Bottle.removeBottle(0));
			const expectedState = Immutable.fromJS({
				batches: {},
				bottles: {
					1: {
						id: 1
					}
				}
			});

			checkEquality(updatedState, expectedState);
		});
	});
});

function checkEquality(actual, expected) {
	if (!Immutable.is(actual, expected)) {
		throw new Error('Expected: ' + JSON.stringify(actual) + ' to be ' + JSON.stringify(expected));
	}
};
