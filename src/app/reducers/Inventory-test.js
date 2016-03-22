import { Batch, Bottle } from '../entities/Entities';
import * as BottleActions from '../actions/Bottle';
import expect from 'expect';
import Immutable from 'immutable';
import Inventory from './Inventory';
import { State } from '../entities/State';

describe('Reducer -', () => {
	const initialState = State();

	describe('Inventory -', () => {

		describe('generic -', () => {

			it('should return the initial state', () => {
				expect(Immutable.is(Inventory(undefined, {}), initialState)).toBe(true);
			});
		});

		describe('bottles -', () => {

			it('should add a bottle', () => {
				const expectedState = State([], [Bottle(0)]);

				const updatedState = Inventory(initialState, BottleActions.addBottle(0));

				checkEquality(updatedState, expectedState);
			});

			it('should remove a bottle', () => {
				const state = State([], [Bottle(0), Bottle(1)]);
				const expectedState = State([], [Bottle(1)]);

				const updatedState = Inventory(state, BottleActions.removeBottle(0));

				checkEquality(updatedState, expectedState);
			});
		});
	});
});

function checkEquality(actual, expected) {
	if (!Immutable.is(actual, expected)) {
		throw new Error('Expected:\t' + actual + '\n\tto be:\t\t' + expected);
	}
};
