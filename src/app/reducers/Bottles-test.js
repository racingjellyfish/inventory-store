import { Batch } from '../entities/Batch';
import { Bottle } from '../entities/Bottle';
import * as BottleActions from '../actions/Bottle';
import expect from 'expect';
import Inventory from './Inventory';
import { InventoryState } from '../entities/InventoryState';

describe('Reducer -', () => {
	const initialState = new InventoryState();

	describe('Bottles -', () => {

		describe('generic -', () => {

			it('should return the initial state', () => {
				checkEquality(Inventory(undefined, {}), initialState);
			});
		});

		describe('bottles -', () => {

			it('should add a bottle', () => {
				const expectedState = InventoryState.create([], [Bottle.create(0)]);

				const updatedState = Inventory(initialState, BottleActions.addBottle(0));

				checkEquality(updatedState, expectedState);
			});

			it('should remove a bottle', () => {
				const state = InventoryState.create([], [Bottle.create(0), Bottle.create(1)]);
				const expectedState = InventoryState.create([], [Bottle.create(1)]);

				const updatedState = Inventory(state, BottleActions.removeBottle(0));

				checkEquality(updatedState, expectedState);
			});

			it('should fill a bottle', () => {
				const state = InventoryState.create([Batch.create(0, 'batch-0')], [Bottle.create(0), Bottle.create(1)]);
				const expectedState = InventoryState.create([Batch.create(0, 'batch-0')], [Bottle.create(0), Bottle.create(1)], [[0, 0]]);

				const updatedState = Inventory(state, BottleActions.fill(0, 0));

				checkEquality(updatedState, expectedState);
			});

			it('should empty a bottle', () => {
				const state = InventoryState.create([Batch.create(0, 'batch-0')], [Bottle.create(0), Bottle.create(1)], [[0, 0]]);
				const expectedState = InventoryState.create([Batch.create(0, 'batch-0')], [Bottle.create(0), Bottle.create(1)]);

				const updatedState = Inventory(state, BottleActions.drink(0));

				checkEquality(updatedState, expectedState);
			});
		});
	});
});

function checkEquality(actual, expected) {
	if (!actual.equals(expected)) {
		throw new Error('Expected:\t' + actual + '\n\tto be:\t\t' + expected);
	}
};
