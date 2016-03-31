import { Batch, Bottle } from '../entities/Entities';
import * as BottleActions from '../actions/Bottle';
import expect from 'expect';
import Inventory from './Inventory';
import * as ServerActions from '../actions/Server';
import { InventoryState } from '../entities/InventoryState';

describe('Reducer -', () => {
	const initialState = new InventoryState();

	describe('Inventory -', () => {

		describe('generic -', () => {

			it('should return the initial state', () => {
				checkEquality(Inventory(undefined, {}), initialState);
			});
		});

		describe('bottles -', () => {

			it('should add a bottle', () => {
				const expectedState = InventoryState.create([], [Bottle(0)]);

				const updatedState = Inventory(initialState, BottleActions.addBottle(0));

				checkEquality(updatedState, expectedState);
			});

			it('should remove a bottle', () => {
				const state = InventoryState.create([], [Bottle(0), Bottle(1)]);
				const expectedState = InventoryState.create([], [Bottle(1)]);

				const updatedState = Inventory(state, BottleActions.removeBottle(0));

				checkEquality(updatedState, expectedState);
			});

			it('should fill a bottle', () => {
				const state = InventoryState.create([Batch(0, 'batch-0')], [Bottle(0), Bottle(1)]);
				const expectedState = InventoryState.create([Batch(0, 'batch-0')], [Bottle(0, 0), Bottle(1)]);

				const updatedState = Inventory(state, BottleActions.fill(0, 0));

				checkEquality(updatedState, expectedState);
			});

			it('should empty a bottle', () => {
				const state = InventoryState.create([Batch(0, 'batch-0')], [Bottle(0, 0), Bottle(1)]);
				const expectedState = InventoryState.create([Batch(0, 'batch-0')], [Bottle(0), Bottle(1)]);

				const updatedState = Inventory(state, BottleActions.drink(0));

				checkEquality(updatedState, expectedState);
			});
		});

		describe('server -', () => {

			it('should merge data', () => {
				const state = new InventoryState();
				const expectedState = InventoryState.create([Batch(0, 'batch-0')], [Bottle(0), Bottle(1)]);
				const jsonData = JSON.stringify({
					batches: [
						{id: 0, name: 'batch-0'}
					],
					bottles: [
						{id: 0},
						{id: 1}
					]
				});

				const updatedState = Inventory(state, ServerActions.receiveData(jsonData));

				checkEquality(updatedState, expectedState);
			});
		});

		it('requesting data should set isFetching flag to true', () => {
			const state = new InventoryState();
			const expectedState = InventoryState.create([], [], { isFetching: true });

			const updatedState = Inventory(state, ServerActions.requestData());

			checkEquality(updatedState, expectedState);
		});
	});
});

function checkEquality(actual, expected) {
	if (!actual.equals(expected)) {
		throw new Error('Expected:\t' + actual + '\n\tto be:\t\t' + expected);
	}
};
